const express = require('express')
const cors = require('cors')
const Airtable = require('airtable')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
require('dotenv').config()

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.BASE_ID)

const coffeeService = require('./coffee.service')

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
  coffees: async (args, context) => {
    return await coffeeService.get(args, context)
  },

  createCoffee: async (args, context) => {
    try {
      return await coffeeService.create(args, context)
    } catch (err) {
      throw new Error('failed to create coffee')
    }
  },

  updateCoffee: async (args, context) => {
    try {
      return await coffeeService.update(args, context)
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
    context: {
      base,
    },
  }),
)
app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
