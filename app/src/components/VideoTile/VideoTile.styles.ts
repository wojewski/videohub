import { StyleSheet } from "react-native";
import { Colors } from "src/styles/colors";

export const styles = StyleSheet.create({
  tile: {
    borderRadius: 20,
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
    height: 300,
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: Colors.grey,
    marginTop: 10,
    marginLeft: 15,
    fontWeight: "500",
  },
  thumbnail: {
    flex: 1,
  },
});
