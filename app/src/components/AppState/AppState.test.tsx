import React from "react";
import AppState from "./AppState";
import { render } from "@testing-library/react-native";

describe("AppState", () => {
  it("renders properly", () => {
    const { getByTestId } = render(
      <AppState
        testID="emptyState"
        titleTestID="emptyStateTitle"
        title="There's nothing here, yet."
      />
    );

    expect(getByTestId("emptyState")).toBeDefined();
    expect(getByTestId("emptyStateTitle").props.children).toEqual(
      "There's nothing here, yet."
    );
  });
});
