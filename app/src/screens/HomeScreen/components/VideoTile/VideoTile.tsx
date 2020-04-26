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
  onBookmarkAction: (isBookmarked: boolean, id: string) => void;
  isBookmarked: boolean;
}

function VideoTile(props: Props) {
  return (
    <TouchableOpacity testID="videoTile" onPress={props.onPress}>
      <View style={styles.tile}>
        <Image
          source={{ uri: props.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
          testID="image"
        />
        <View style={styles.details}>
          <Text testID="title" style={styles.title}>
            {props.title}
          </Text>
          <BookmarkButton
            onPress={() => props.onBookmarkAction(props.isBookmarked, props.id)}
            bookmarked={props.isBookmarked}
            size={30}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(VideoTile);
