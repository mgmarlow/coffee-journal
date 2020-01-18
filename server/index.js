const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  input CoffeeInput {
    name: String
    rating: Int
  }

  type Coffee {
    id: String
    name: String
    rating: Int
  }

  type Query {
    coffees: [Coffee]!
  }

  type Mutation {
    createCoffee(input: CoffeeInput): Coffee
    updateCoffee(id: ID!, input: CoffeeInput): Coffee
  }
`)

class Coffee {
  constructor(id, { name, rating }) {
    this.id = id
    this.name = name
    this.rating = rating
  }
}

const fakeDatabase = {
  coffees: {},
}

const root = {
  coffees: () => {
    return Object.keys(fakeDatabase.coffees).map(
      id => new Coffee(id, fakeDatabase.coffees[id]),
    )
  },

  createCoffee: ({ input }) => {
    const id = require('crypto')
      .randomBytes(10)
      .toString('hex')

    fakeDatabase.coffees[id] = input

    return new Coffee(id, input)
  },

  updateCoffee: ({ id, input }) => {
    if (!fakeDatabase.coffees[id]) {
      throw new Error('no coffee exists with id ' + id)
    }

    fakeDatabase.coffees[id] = input
    return new Coffee(id, input)
  },
}

const app = express()
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // navigate to /graphql for a graphql browser interface
  }),
)
app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
