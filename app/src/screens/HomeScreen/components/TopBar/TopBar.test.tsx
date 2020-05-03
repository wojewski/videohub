import React from "react";
import TopBar from "./TopBar";
import { render } from "@testing-library/react-native";

describe("TopBar", () => {
  it("renders without error", () => {
    const { getByTestId } = render(<TopBar />);
    expect(getByTestId("topBar")).toBeDefined();
  });
});
