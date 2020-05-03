import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  video: {
    aspectRatio: 1,
    width: "100%",
    backgroundColor: Colors.black,
  },
  controlsTop: {
    alignSelf: "flex-end",
    padding: 10,
  },
  controlsBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});
