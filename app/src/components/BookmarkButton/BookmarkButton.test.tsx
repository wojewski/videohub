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
});
