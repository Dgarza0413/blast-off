const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, 'utf-8');

const server = new ApolloServer({ typeDefs })

server.listen().then(({ url }) =>
    console.log(`server ready at ${url}`))