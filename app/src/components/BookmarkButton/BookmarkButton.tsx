import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BookmarkContext } from "src/hooks/useBookmarks/useBookmarks";
import { Colors } from "src/styles/colors";

interface Props {
  size: number;
  id: string;
}

export default function BookmarkButton(props: Props) {
  const { size, id } = props;
  const { isBookmarked, onBookmarkAction } = useContext(BookmarkContext);

  return (
    <TouchableOpacity
      onPress={() => onBookmarkAction(isBookmarked(id), id)}
      testID="iconButton"
    >
      <MaterialCommunityIcons
        name={isBookmarked(id) ? "bookmark-check" : "bookmark-plus"}
        color={isBookmarked(id) ? Colors.blue : Colors.grey}
        size={size}
      />
    </TouchableOpacity>
  );
}
