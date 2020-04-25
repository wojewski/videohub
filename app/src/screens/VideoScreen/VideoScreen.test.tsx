import React from "react";
import { render, wait, act } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/react-testing";
import video from "src/mocks/data/video.json";
import { videoQuery } from "./graphql/queries";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import VideoScreen from "./VideoScreen";

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
);

describe("VideoScreen", () => {
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

    expect(getByTestId("errorStateTitle")).toBeDefined();
  });
});
