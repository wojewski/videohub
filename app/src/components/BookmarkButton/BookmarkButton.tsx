import React, { useState } from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  bookmarked: boolean;
  size: number;
  onPress: (event: GestureResponderEvent) => void;
}

export default function BookmarkButton(props: Props) {
  const { bookmarked, size, onPress } = props;
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const onPressAction = (event: GestureResponderEvent) => {
    setIsBookmarked(!isBookmarked);
    onPress(event);
  };

  return (
    <TouchableOpacity onPress={onPressAction} testID="iconButton">
      <AntDesign
        name={isBookmarked ? "heart" : "hearto"}
        size={size}
        color={isBookmarked ? "red" : "black"}
      />
    </TouchableOpacity>
  );
}
