import { StyleSheet } from "react-native";
import { Colors } from "src/styles/colors";

export const styles = StyleSheet.create({
  tile: {
    borderRadius: 20,
    flex: 1,
    marginBottom: 15,
  },
  hr: {
    borderBottomColor: "#ececec",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: Colors.grey,
    marginTop: 10,
    fontWeight: "600",
  },
  thumbnail: {
    flex: 1,
    height: 300,
  },
  details: {
    marginLeft: 10,
    marginRight: 10,
  },
  top: {
    alignSelf: "flex-end",
    marginBottom: 5,
  },
});
