import { StyleSheet } from "react-native";
import { Colors } from "src/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: Colors.grey,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
