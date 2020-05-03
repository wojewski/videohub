import React from "react";
import HomeScreen from "./HomeScreen";
import { render, wait, act } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/react-testing";
import videos from "src/mocks/data/videos.json";
import { videosQuery } from "./graphql/queries";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BookmarkContext } from "src/hooks/useBookmarks/useBookmarks";

const Stack = createStackNavigator();

const mocks = [
  {
    request: {
      query: videosQuery,
    },
    result: {
      data: {
        videos,
        loading: false,
      },
    },
  },
];

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

const shape = (
  <BookmarkContext.Provider
    value={{
      isBookmarked: jest.fn(),
      onBookmarkAction: jest.fn(),
      bookmarks: ["001"],
    }}
  >
    <MockedProvider mocks={mocks} addTypename={false}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MockedProvider>
  </BookmarkContext.Provider>
);

describe("HomeScreen", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});

  it("loader mounts and unmounts properly", async () => {
    const { queryByTestId } = render(shape);
    expect(queryByTestId("loader")).toBeDefined();

    await act(wait);

    expect(queryByTestId("loader")).toBe(null);
  });

  it("renders properly", async () => {
    const { getByTestId } = render(shape);

    await act(wait);
    expect(getByTestId("videoList")).toBeDefined();
  });

  it("renders emptyState if there are no videos", async () => {
    const mockEmpty = [
      {
        request: {
          query: videosQuery,
        },
        result: {
          data: {
            videos: [],
            loading: false,
          },
        },
      },
    ];

    const { getByTestId } = render(
      <BookmarkContext.Provider
        value={{
          isBookmarked: jest.fn(),
          onBookmarkAction: jest.fn(),
          bookmarks: [],
        }}
      >
        <MockedProvider mocks={mockEmpty} addTypename={false}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </MockedProvider>
      </BookmarkContext.Provider>
    );

    await act(wait);
    expect(getByTestId("emptyState")).toBeDefined();
  });

  it("renders emptyState if there are no bookmarked videos on Bookmarks screen", async () => {
    const { getByTestId } = render(
      <BookmarkContext.Provider
        value={{
          isBookmarked: jest.fn(),
          onBookmarkAction: jest.fn(),
          bookmarks: [],
        }}
      >
        <MockedProvider mocks={mocks} addTypename={false}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Bookmarks" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </MockedProvider>
      </BookmarkContext.Provider>
    );

    await act(wait);
    expect(getByTestId("emptyState")).toBeDefined();
  });

  it("renders ErrorState component if an error happens", async () => {
    const { getByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: videosQuery,
            },
            error: new Error("500 Internal Server Error"),
          },
        ]}
        addTypename={false}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    await act(wait);

    expect(getByTestId("errorState")).toBeDefined();
  });
});
