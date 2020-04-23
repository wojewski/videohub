import React from "react";
import VideoTile from "./VideoTile";
import { render } from "@testing-library/react-native";
import video from "src/mocks/video.json";

describe("videoTile", () => {
  it("renders proper content", () => {
    const { getByTestId } = render(<VideoTile {...video} onPress={() => {}} />);
    expect(getByTestId("title").props.children).toBe(video.title);
    expect(getByTestId("image").props.source.uri).toBe(video.thumbnail);
  });
});
