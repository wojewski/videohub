import React from "react";
import Home from "./HomeScreen";
import { render, wait, act } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/react-testing";
import videos from "src/mocks/videos.json";
import { videosQuery } from "./graphql/queries";

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

const shape = (
  <MockedProvider mocks={mocks} addTypename={false}>
    <Home />
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
});
