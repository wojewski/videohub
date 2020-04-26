import React from "react";
import HomeScreen from "./HomeScreen";
import { render, wait, act } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/react-testing";
import videos from "src/mocks/data/videos.json";
import { videosQuery } from "./graphql/queries";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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

// In order to silent AsyncStorage source error
console.error = jest.fn();

const shape = (
  <MockedProvider mocks={mocks} addTypename={false}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </MockedProvider>
);

describe("HomeScreen", () => {
  it("loader mounts and unmounts properly", async () => {
    const { queryByTestId } = render(shape);
    expect(queryByTestId("loader")).toBeDefined();

    await act(wait);

    expect(queryByTestId("loader")).toBe(null);
  });

  it("renders properly", async () => {
    const { queryByTestId } = render(shape);

    await act(wait);
    expect(queryByTestId("videoList")).toBeDefined();
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

    expect(getByTestId("errorStateTitle")).toBeDefined();
  });
});
