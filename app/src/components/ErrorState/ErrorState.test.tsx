import React from "react";
import ErrorState from "./ErrorState";
import { render } from "@testing-library/react-native";

describe("ErrorState", () => {
  it("renders properly", () => {
    const { getByTestId } = render(<ErrorState />);

    expect(getByTestId("errorStateTitle").props.children).toContain(
      "Oops! Something went wrong."
    );
  });
});
