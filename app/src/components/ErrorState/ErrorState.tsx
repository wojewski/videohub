import React, { FC } from "react";
import AppState from "src/components/AppState/AppState";

export const ErrorState: FC<{}> = () => (
  <AppState
    testID="errorState"
    titleTestID="errorStateTitle"
    title="Something went wrong!"
  />
);
