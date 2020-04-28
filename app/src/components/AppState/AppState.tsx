import React, { FC, memo } from "react";
import { styles } from "./AppState.styles";
import { Text, SafeAreaView, Image } from "react-native";

interface Props {
  title: string;
  testID?: string;
  titleTestID?: string;
}

const AppState: FC<Props> = memo(({ title, testID, titleTestID }) => {
  return (
    <SafeAreaView testID={testID} style={styles.error}>
      <Image
        style={styles.image}
        source={require("../../../assets/logo.png")}
        resizeMode="contain"
      />
      <Text style={styles.title} testID={titleTestID}>
        {title}
      </Text>
    </SafeAreaView>
  );
});

export default AppState;

export const ErrorState: FC<{}> = () => (
  <AppState
    testID="errorState"
    titleTestID="errorStateTitle"
    title="Something went wrong!"
  />
);
