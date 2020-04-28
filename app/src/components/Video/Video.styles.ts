import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * (9 / 16),
    backgroundColor: "black",
  },
  controlsTop: {
    alignSelf: "flex-end",
    padding: 10,
  },
  controlsBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
