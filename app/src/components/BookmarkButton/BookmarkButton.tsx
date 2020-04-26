import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useBookmarks, {
  BookmarkContext,
} from "src/hooks/useBookmarks/useBookmarks";

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
      <AntDesign
        name={isBookmarked(id) ? "heart" : "hearto"}
        color={isBookmarked(id) ? "red" : "black"}
        size={size}
      />
    </TouchableOpacity>
  );
}
