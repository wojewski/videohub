import React, { useContext, FC } from "react";
import { TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BookmarkContext } from "src/hooks/useBookmarks/useBookmarks";
import { Colors } from "src/styles/colors";
import { styles } from "./BookmarkButton.styles";

interface Props {
  size: number;
  id: string;
}

const BookmarkButton: FC<Props> = ({ size, id }) => {
  const { isBookmarked, onBookmarkAction } = useContext(BookmarkContext);
  const bookmarked = isBookmarked(id);

  return (
    <TouchableOpacity
      onPress={() => onBookmarkAction(isBookmarked(id), id)}
      testID="iconButton"
      style={styles.button}
    >
      {bookmarked ? (
        <Text testID="addedtext">Added</Text>
      ) : (
        <Text testID="addtext">Add to bookmarks</Text>
      )}
      <MaterialCommunityIcons
        name={bookmarked ? "bookmark-check" : "bookmark-plus"}
        color={bookmarked ? Colors.blue : Colors.grey}
        size={size}
      />
    </TouchableOpacity>
  );
};

export default BookmarkButton;
