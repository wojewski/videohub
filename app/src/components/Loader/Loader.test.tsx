import React from "react";
import Loader from "./Loader";
import { render } from "@testing-library/react-native";

describe("Loader", () => {
  it("renders without error", () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId("loader")).toBeDefined();
  });
});
