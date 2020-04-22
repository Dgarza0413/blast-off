import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { resolvers, typeDefs } from './resolvers';
import { useQuery } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import Pages from './pages';
import Login from './pages/login';
import injectStyles from './styles';
import gql from 'graphql-tag';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
})

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    headers: { authorization: localStorage.getItem('token') },
    uri: "http://localhost:4000/graphql"
  }),
  typeDefs,
  resolvers
});

const IS_LOGGED_IN = gql`
query IsUserLoggedIn {
  isLoggedIn @client
}
`

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: []
  }
})

injectStyles();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* <App /> */}
      <Pages />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
