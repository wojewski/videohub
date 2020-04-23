import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Home from './src/screens/Home/Home';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}
