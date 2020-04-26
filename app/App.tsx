import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ErrorBoundary from 'src/components/ErrorBoundary/ErrorBoundary';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import VideoScreen from 'src/screens/VideoScreen/VideoScreen';
import useBookmarks, {
  BookmarkContext,
} from 'src/hooks/useBookmarks/useBookmarks';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const Stack = createStackNavigator();

export default function App() {
  const { isBookmarked, onBookmarkAction, bookmarks } = useBookmarks();

  return (
    <ErrorBoundary>
      <BookmarkContext.Provider
        value={{ isBookmarked, onBookmarkAction, bookmarks }}
      >
        <ApolloProvider client={client}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="VideoScreen" component={VideoScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
      </BookmarkContext.Provider>
    </ErrorBoundary>
  );
}
