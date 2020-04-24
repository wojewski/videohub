import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { styles } from "./VideoTile.styles";
import { Video } from "src/types/types";

interface Props extends Video {
  onPress: (event: GestureResponderEvent) => void;
}

export default function VideoTile(props: Props) {
  return (
    <TouchableOpacity testID="videoTile" onPress={props.onPress}>
      <View style={styles.tile}>
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
    </TouchableOpacity>
  );
}
