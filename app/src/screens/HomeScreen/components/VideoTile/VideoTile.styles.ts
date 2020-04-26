import { StyleSheet } from "react-native";
import { Colors } from "src/styles/colors";

export const styles = StyleSheet.create({
  tile: {
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: Colors.grey,
    marginTop: 10,
    fontWeight: "500",
  },
  thumbnail: {
    flex: 1,
    height: 300,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
});
