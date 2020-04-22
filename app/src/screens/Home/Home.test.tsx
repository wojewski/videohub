import React from "react";
import Home from "./Home";
import { render } from "@testing-library/react-native";

describe("Home", () => {
  it("renders properly", () => {
    const { getByTestId } = render(<Home />);

    expect(getByTestId("home")).toBeDefined();
  });
});
