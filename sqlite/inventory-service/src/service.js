const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const dotenv = require('dotenv').config();


const server = new ApolloServer({
    typeDefs,
    resolvers
});


server
    .listen({ port: process.env.PORT })
    .then(({ url }) => console.log(`Server is running on ${url}`));