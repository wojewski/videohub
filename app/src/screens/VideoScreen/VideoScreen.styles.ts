import { StyleSheet } from "react-native";
import { Colors } from "src/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
  },
  video: {
    height: 250,
  },
  title: {
    fontSize: 20,
  },
});
