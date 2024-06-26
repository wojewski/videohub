import React from "react";
import { render, wait, act } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/react-testing";
import video from "src/mocks/data/video.json";
import { videoQuery } from "./graphql/queries";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import VideoScreen from "./VideoScreen";
import { BookmarkContext } from "src/hooks/useBookmarks/useBookmarks";
import * as ScreenOrientation from "expo-screen-orientation";

const Stack = createStackNavigator();

const mocks = [
  {
    request: {
      query: videoQuery,
      variables: {
        id: video.id,
      },
    },

    result: {
      data: {
        video,
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
      bookmarks: [],
    }}
  >
    <MockedProvider mocks={mocks} addTypename={false}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="VideoScreen"
            component={VideoScreen}
            initialParams={{ id: video.id }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MockedProvider>
  </BookmarkContext.Provider>
);

describe("VideoScreen", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});

  it("loader mounts and unmounts properly", async () => {
    const { queryByTestId } = render(shape);
    expect(queryByTestId("loader")).toBeDefined();

    await act(wait);
    expect(queryByTestId("loader")).toBe(null);
  });

  it("renders components with proper values", async () => {
    const { getByTestId } = render(shape);

    await act(wait);
    expect(getByTestId("videoPlayer").props.proxiedProperties.source.uri).toBe(
      video.url
    );
    expect(getByTestId("title").props.children).toContain(video.title);
    expect(getByTestId("description").props.children).toContain(
      video.description
    );
  });

  it("renders ErrorState component if an error happens", async () => {
    const { getByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: videoQuery,
              variables: {
                id: video.id,
              },
            },
            error: new Error("500 Internal Server Error"),
          },
        ]}
        addTypename={false}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="VideoScreen"
              component={VideoScreen}
              initialParams={{ id: video.id }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    await act(wait);

    expect(getByTestId("errorState")).toBeDefined();
  });

  it("sets screen orientation to Portrait on mount and unlocks them on unmount", async () => {
    const lockAsyncSpy = jest.spyOn(ScreenOrientation, "lockAsync");
    const unlockAsyncSpy = jest.spyOn(ScreenOrientation, "unlockAsync");

    const { unmount } = render(shape);

    await act(wait);

    expect(lockAsyncSpy).toHaveBeenCalledWith(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );

    unmount();

    await act(wait);

    expect(unlockAsyncSpy).toHaveBeenCalled();
  });
});
