import React from "react";
import { Text, SafeAreaView, ActivityIndicator } from "react-native";
import { Video as VideoPlayer } from "expo-av";
import { Colors } from "src/styles/colors";
import { styles } from "./VideoScreen.styles";
import { withVideo } from "./graphql/queries";
import { Video } from "src/types/types";

interface Props {
  video: Video;
  loading: boolean;
}

function VideoScreen(props: Props) {
  const { video, loading } = props;
  return (
    <SafeAreaView style={styles.container}>
      {loading && !video ? (
        <ActivityIndicator testID="loader" size="large" color={Colors.grey} />
      ) : (
        <>
          <VideoPlayer
            source={{
              uri: video.url,
            }}
            resizeMode="contain"
            style={styles.video}
            useNativeControls
            shouldPlay
          />
          <Text style={styles.title}>{video.title}</Text>
          <Text>{video.description}</Text>
        </>
      )}
    </SafeAreaView>
  );
}

export default withVideo(VideoScreen);
