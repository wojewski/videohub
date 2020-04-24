import React from "react";
import VideoTile from "./VideoTile";
import { render, fireEvent, act, wait } from "@testing-library/react-native";
import video from "src/mocks/video.json";

describe("videoTile", () => {
  it("renders proper content", async () => {
    const { getByTestId } = render(<VideoTile {...video} onPress={() => {}} />);
    expect(getByTestId("title").props.children).toBe(video.title);
    expect(getByTestId("image").props.source.uri).toBe(video.thumbnail);
  });
  it("fires props function on press", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<VideoTile {...video} onPress={onPress} />);
    fireEvent.press(getByTestId("videoTile"));
    expect(onPress).toHaveBeenNthCalledWith(1);
  });
});
