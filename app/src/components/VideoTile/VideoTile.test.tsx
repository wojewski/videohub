import React from "react";
import VideoItem from "./VideoTile";
import { render } from "@testing-library/react-native";
import video from "src/mocks/video.json";

describe("videoTile", () => {
  it("renders proper content", () => {
    const { getByTestId } = render(<VideoItem {...video} />);

    expect(getByTestId("title").props.children).toBe(video.title);
    expect(getByTestId("image").props.source.uri).toBe(video.thumbnail);
  });
});
