import React from "react";
import ErrorState from "./ErrorState";
import { render, fireEvent, act, wait } from "@testing-library/react-native";

describe("ErrorState", () => {
  it("renders properly", () => {
    const { getByTestId } = render(<ErrorState />);

    expect(getByTestId("errorStateTitle").props.children).toContain(
      "Oops! Something went wrong."
    );
  });
});
