const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const jwt = require('express-jwt')
const { makeExecutableSchema } = require('graphql-tools')
require('dotenv').config()

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const context = require('./context')

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
})

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express()
app.use(cors())
app.use(
  '/graphql',
  bodyParser.json(),
  auth,
  graphqlHTTP(req => {
    return {
      schema,
      graphiql: true, // navigate to /graphql for a graphql browser interface
      context: context(req),
    }
  }),
)
app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
