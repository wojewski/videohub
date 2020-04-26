import React, { memo } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { styles } from "./VideoTile.styles";
import { Video } from "src/types/types";
import BookmarkButton from "src/components/BookmarkButton/BookmarkButton";

interface Props extends Video {
  onPress: (event: GestureResponderEvent) => void;
}

function VideoTile(props: Props) {
  return (
    <View style={styles.tile}>
      <TouchableOpacity testID="videoTile" onPress={props.onPress}>
        <Image
          source={{ uri: props.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
          testID="image"
        />
      </TouchableOpacity>
      <View style={styles.details}>
        <Text testID="title" style={styles.title}>
          {props.title}
        </Text>
        <BookmarkButton id={props.id} size={30} />
      </View>
    </View>
  );
}

export default memo(VideoTile);
