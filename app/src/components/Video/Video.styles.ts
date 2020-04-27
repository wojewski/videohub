import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * (9 / 16),
    backgroundColor: "black",
  },
  controlsTop: {
    alignSelf: "flex-end",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  controlsBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  poster: {
    width: 300,
    height: 300,
  },
});
