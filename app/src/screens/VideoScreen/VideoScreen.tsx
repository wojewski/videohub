import React from "react";
import { Text, SafeAreaView, ActivityIndicator } from "react-native";
import { Video } from "expo-av";
import { Colors } from "src/styles/colors";
import { styles } from "./VideoScreen.styles";
import { withVideo, Response } from "./graphql/queries";
import ErrorState from "src/components/ErrorState/ErrorState";
import Loader from "src/components/Loader/Loader";

interface Props extends Response {}

function VideoScreen(props: Props) {
  const { video, loading, error } = props;

  if (error) {
    return <ErrorState />;
  }

  if (loading && !video) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Video
        testID="videoPlayer"
        source={{
          uri: video.url,
        }}
        resizeMode="contain"
        style={styles.video}
        useNativeControls
        shouldPlay
      />
      <Text testID="title" style={styles.title}>
        {video.title}
      </Text>
      <Text testID="description">{video.description}</Text>
    </SafeAreaView>
  );
}

export default withVideo(VideoScreen);
