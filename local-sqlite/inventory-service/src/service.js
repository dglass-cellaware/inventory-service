const { ApolloServer } = require('apollo-server')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

const core = require('./core');

const server = new ApolloServer({
    typeDefs,
    resolvers
})


server
    .listen()
    .then(({ url }) => console.log('Server is running on localhost:4000'))