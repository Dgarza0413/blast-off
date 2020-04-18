const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, 'utf-8');

const { createStore } = require('./utils')

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const resolvers = require('./resolvers');
const store = createStore();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store })
    })

})

server.listen().then(({ url }) =>
    console.log(`server ready at ${url}`))