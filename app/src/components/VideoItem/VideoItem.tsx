import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./VideoItem.styles";
import { Video } from "src/screens/Home/types";

export default function VideoItem(props: Video) {
  return (
    <View testID="videoItem">
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}
