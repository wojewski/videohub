import React from "react";
import { render } from "@testing-library/react-native";
import BookmarkButton from "./BookmarkButton";
import { BookmarkContext } from "src/hooks/useBookmarks/useBookmarks";

describe("BookmarkButton", () => {
  it("renders without errors", () => {
    const { getByTestId } = render(
      <BookmarkContext.Provider
        value={{
          isBookmarked: jest.fn(),
          onBookmarkAction: jest.fn(),
          bookmarks: [],
        }}
      >
        <BookmarkButton size={30} id="001" />
      </BookmarkContext.Provider>
    );

    expect(getByTestId("iconButton")).toBeDefined();
  });

  it("displays addedtext text if isBookmarked equals true", () => {
    const { queryByTestId } = render(
      <BookmarkContext.Provider
        value={{
          isBookmarked: jest.fn().mockReturnValue(true),
          onBookmarkAction: jest.fn(),
          bookmarks: ["001"],
        }}
      >
        <BookmarkButton size={30} id="001" />
      </BookmarkContext.Provider>
    );

    expect(queryByTestId("addedtext")).toBeDefined();
    expect(queryByTestId("addtext")).toBeNull();
  });

  it("displays addtext text if isBookmarked equals false", () => {
    const { queryByTestId } = render(
      <BookmarkContext.Provider
        value={{
          isBookmarked: jest.fn().mockReturnValue(false),
          onBookmarkAction: jest.fn(),
          bookmarks: ["009"],
        }}
      >
        <BookmarkButton size={30} id="001" />
      </BookmarkContext.Provider>
    );

    expect(queryByTestId("addtext")).toBeDefined();
    expect(queryByTestId("addedtext")).toBeNull();
  });
});
