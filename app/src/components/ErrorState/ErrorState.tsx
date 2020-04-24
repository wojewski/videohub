import React from "react";
import { styles } from "./ErrorState.styles";
import { Text, SafeAreaView } from "react-native";

export default function ErrorState() {
  return (
    <SafeAreaView style={styles.error}>
      <Text testID="errorStateTitle" style={styles.title}>
        Oops! Something went wrong.
      </Text>
    </SafeAreaView>
  );
}
