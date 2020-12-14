import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import resolvers from './cache/resolvers';   
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { setSpotifyAccess, setSpotifyAccessToken, setSpotifyTokenExpirationTime } from "./data/LocalStorage";

import './styles/css/index.css';

const cache = new InMemoryCache({ dataIdFromObject: object => `${object.__typename}:${object._id}`, });

const hashStr = window.location.hash;       // Everything in address after #, here spotify puts successfull auth tokens
const searchStr = window.location.search;   // Everything in address after ?, here spotify puts access denials
const hashParams = decodeHashParams(hashStr.slice(1, hashStr.length));
const searchParams = decodeHashParams(searchStr.slice(1, searchStr.length));

export function decodeHashParams(str) {
  const hashParams = {};
  const a = /\+/g;                          // Regex for replacing addition symbol with a space
  const r = /([^&;=]+)=?([^&;]*)/g;
  const d = (s) => decodeURIComponent(s.replace(a, " "));
  let e;

  while (e = r.exec(str)) {
    hashParams[d(e[1])] = d(e[2]);
  }
  return hashParams;
}

const SERVER_LOCAL_DOMAIN = 'http://localhost:3001/graphql';
const SERVER_DOMAIN = 'https://waveback416.herokuapp.com/graphql'

const client = new ApolloClient({
  uri: SERVER_LOCAL_DOMAIN,
  credentials: 'include',
  cache: cache,
  resolvers
});

if (hashParams.access_token) {
  setSpotifyAccess("allowed");
  setSpotifyAccessToken(hashParams.access_token);
  setSpotifyTokenExpirationTime(hashParams.expires_in);
  window.close();
}
else if (searchParams.error) {
  setSpotifyAccess("denied");
  window.close();
}
else {
  ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}