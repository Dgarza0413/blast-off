const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const isEmail = require('isemail');

const { createStore } = require('./utils')

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const resolvers = require('./resolvers');
const store = createStore();

const server = new ApolloServer({
    context: async ({ req }) => {
        const auth = req.headers && req.headers.authorization || '';
        const email = Buffer.from(auth, 'base64').toString('ascii');
        if (!isEmail.validate(email)) return { user: null };
        // find a user by their email
        const users = await store.users.findOrCreate({ where: { email } });
        const user = users && users[0] || null;

        return { user: { ...user.dataValues } };
    },
    typeDefs,
    resolvers,
    engine: {
        apikey: process.env.APOLLO_MANAGER_APIKEY
    },
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store })
    }),
})

server.listen().then(({ url }) =>
    console.log(`server ready at ${url}`))