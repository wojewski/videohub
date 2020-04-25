import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Colors } from "src/styles/colors";
import { styles } from "./Loader.styles";

export default function Loader() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator testID="loader" size="large" color={Colors.grey} />
    </View>
  );
}
