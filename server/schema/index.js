const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  input CoffeeInput {
    roaster: String!
    name: String!
    rating: Int!
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
    getCoffee(id: ID!): Coffee
  }

  type Mutation {
    createCoffee(input: CoffeeInput): Coffee
    updateCoffee(id: ID!, input: CoffeeInput): Coffee
    deleteCoffee(id: ID!): String
  }
`)
