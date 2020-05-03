import { StyleSheet } from "react-native";
import { Colors } from "src/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
  },
  statusBar: {
    backgroundColor: Colors.black,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  content: {
    padding: 10,
  },
  action: {
    alignSelf: "flex-end",
  },
});
