import React, { FC } from "react";
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

const VideoTile: FC<Props> = ({ onPress, title, id, thumbnail }) => {
  return (
    <View style={styles.tile}>
      <View style={styles.hr} />
      <View style={styles.top}>
        <BookmarkButton id={id} size={30} />
      </View>
      <TouchableOpacity testID="videoTileButton" onPress={onPress}>
        <Image
          source={{ uri: thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
          testID="image"
        />
      </TouchableOpacity>
      <View style={styles.details}>
        <Text testID="title" style={styles.title}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default VideoTile;
