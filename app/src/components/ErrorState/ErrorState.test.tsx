import React from "react";
import { ErrorState } from "./ErrorState";
import { render } from "@testing-library/react-native";

describe("ErrorState", () => {
  it("renders properly", () => {
    const { getByTestId } = render(<ErrorState />);

    expect(getByTestId("errorState")).toBeDefined();
    expect(getByTestId("errorStateTitle").props.children).toEqual(
      "Something went wrong!"
    );
  });
});
