const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
require('dotenv').config()

const root = require('./root')
const schema = require('./schema')
const context = require('./context')

const app = express()
app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // navigate to /graphql for a graphql browser interface
    context,
  }),
)
app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
