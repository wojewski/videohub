import React from "react";
import VideoItem from "./VideoItem";
import { render } from "@testing-library/react-native";
import video from "src/mocks/video.json";

describe("videoItem", () => {
  it("renders properly", () => {
    const { getByTestId } = render(<VideoItem {...video} />);
    expect(getByTestId("videoItem")).toBeDefined();
  });
});
