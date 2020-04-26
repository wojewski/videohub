import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { enableScreens } from 'react-native-screens';
import useBookmarks, {
  BookmarkContext,
} from 'src/hooks/useBookmarks/useBookmarks';
import Navigation from 'src/components/Navigation/Navigation';
import ErrorBoundary from 'src/components/ErrorBoundary/ErrorBoundary';

enableScreens();

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default function App() {
  const { isBookmarked, onBookmarkAction, bookmarks } = useBookmarks();

  return (
    <ErrorBoundary>
      <BookmarkContext.Provider
        value={{ isBookmarked, onBookmarkAction, bookmarks }}
      >
        <ApolloProvider client={client}>
          <Navigation />
        </ApolloProvider>
      </BookmarkContext.Provider>
    </ErrorBoundary>
  );
}
