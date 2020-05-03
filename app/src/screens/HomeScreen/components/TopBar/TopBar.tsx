import React, { FC, memo } from "react";
import { View, Image } from "react-native";
import { styles } from "./TopBar.styles";

const TopBar: FC<{}> = () => {
  return (
    <View style={styles.container} testID="topBar">
      <Image
        style={styles.logo}
        source={require("../../../../../assets/logo.png")}
      />
    </View>
  );
};

export default memo(TopBar);
