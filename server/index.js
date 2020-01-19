const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
require('dotenv').config()

const CoffeeService = require('./CoffeeService')

const schema = buildSchema(`
  input CoffeeInput {
    roaster: String
    name: String
    rating: Int
    roast_date: String
    brew_date: String
    roast_style: String
    origin: String
    notes: String
  }

  type Coffee {
    id: String
    roaster: String
    name: String
    rating: Int
    roast_date: String
    brew_date: String
    roast_style: String
    origin: String
    notes: String
  }

  type Query {
    coffees: [Coffee]!
  }

  type Mutation {
    createCoffee(input: CoffeeInput): Coffee
    updateCoffee(id: ID!, input: CoffeeInput): Coffee
  }
`)

const root = {
  coffees: async () => {
    return await CoffeeService.get()
  },

  createCoffee: async args => {
    try {
      return await CoffeeService.create(args)
    } catch (err) {
      throw new Error('failed to create coffee')
    }
  },

  updateCoffee: async args => {
    try {
      return await CoffeeService.update(args)
    } catch (err) {
      throw new Error(`failed to update coffee with id ${id}`)
    }
  },
}

const app = express()
app.use(cors())
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
