import React from "react";
import VideoTile from "./VideoTile";
import { render, fireEvent } from "@testing-library/react-native";
import video from "src/mocks/data/video.json";
import { BookmarkContext } from "src/hooks/useBookmarks/useBookmarks";

describe("videoTile", () => {
  const onPress = jest.fn();

  const shape = (
    <BookmarkContext.Provider
      value={{
        isBookmarked: jest.fn(),
        onBookmarkAction: jest.fn(),
        bookmarks: [],
      }}
    >
      <VideoTile {...video} onPress={onPress} />
    </BookmarkContext.Provider>
  );

  it("renders proper content", async () => {
    const { getByTestId } = render(shape);
    expect(getByTestId("title").props.children).toBe(video.title);
    expect(getByTestId("image").props.source.uri).toBe(video.thumbnail);
  });

  it("fires onPress function on pressing videoTile", () => {
    const { getByTestId } = render(shape);

    fireEvent.press(getByTestId("videoTile"));
    expect(onPress).toHaveBeenNthCalledWith(1);
  });
});
