const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const dotenv = require('dotenv').config();
const cellaware_sqlite = require('@cellaware/sqlite-json-wrapper');

cellaware_sqlite.cacheDbPath("db/inventory-service.db");
cellaware_sqlite.configure({ printSql: true });

const server = new ApolloServer({
    typeDefs,
    resolvers
});


server
    .listen({ port: 4001 })
    .then(({ url }) => console.log(`Server is running on ${url}`));