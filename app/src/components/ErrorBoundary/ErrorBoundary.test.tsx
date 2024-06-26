import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import { ErrorBoundary } from "./ErrorBoundary";

interface Props {
  shouldThrow?: boolean;
}

function DangerComponent({ shouldThrow }: Props) {
  if (shouldThrow) {
    throw new Error();
  }
  return null;
}

beforeAll(() => {
  console.error = jest.fn();
});

const boundaryShape = (
  <ErrorBoundary>
    <View testID="children">Children component</View>
  </ErrorBoundary>
);

describe("ErrorBoundary", () => {
  it("renders children component properly if there is no error", () => {
    const { getByTestId } = render(boundaryShape);

    expect(getByTestId("children")).toBeDefined();
  });

  it("renders ErrorState if the error appears", () => {
    const { rerender, getByTestId } = render(boundaryShape);

    rerender(
      <ErrorBoundary>
        <DangerComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(getByTestId("errorState")).toBeDefined();
  });
});
