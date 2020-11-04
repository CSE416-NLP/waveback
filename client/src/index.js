import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import resolvers from './cache/resolvers';   // Uncomment when we have resolvers
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './styles/css/index.css';

const cache = new InMemoryCache({ dataIdFromObject: object => `${object.__typename}:${object._id}`, });

const SERVER_LOCAL_DOMAIN = 'http://localhost:3001/graphql';

const client = new ApolloClient({
  uri: SERVER_LOCAL_DOMAIN,
  credentials: 'include',
  cache: cache,
  resolvers    // Uncomment when we have resolvers
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
