import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./VideoTile.styles";
import { Video } from "src/screens/Home/types";

export default function VideoTile(props: Video) {
  return (
    <View style={styles.tile} testID="videoTile">
      <Image
        source={{ uri: props.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
        testID="image"
      />
      <Text testID="title" style={styles.title}>
        {props.title}
      </Text>
    </View>
  );
}
