const { buildSchema } = require('graphql')

module.exports = `
  input CoffeeInput {
    roaster: String!
    name: String!
    rating: Int!
    roast_date: String
    brew_date: String
    roast_style: String
    origin: String
    notes: String
    user_id: String
  }

  "Black coffee."
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
    user: User
  }

  type User {
    id: String!
    email: String!
    coffees: [Coffee]
  }

  type Query {
    coffees: [Coffee]!
    getCoffee(id: ID!): Coffee
    user: User
  }

  type Mutation {
    createCoffee(input: CoffeeInput): Coffee
    updateCoffee(id: ID!, input: CoffeeInput): Coffee
    deleteCoffee(id: ID!): String

    signup(email: String!, password: String!): String
    login(email: String!, password: String!): String
  }
`
