import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "src/styles/colors";

export default function Home() {
  return (
    <View testID="home" style={styles.container}>
      <Text style={styles.text}>VideoHub</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: Colors.white,
  },
});
