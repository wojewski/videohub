import React from "react";
import { render } from "@testing-library/react-native";
import BookmarkButton from "./BookmarkButton";

describe("BookmarkButton", () => {
  it("renders without errors", () => {
    const { getByTestId } = render(
      <BookmarkButton bookmarked={true} size={30} onPress={() => {}} />
    );

    expect(getByTestId("iconButton")).toBeDefined();
  });
});
