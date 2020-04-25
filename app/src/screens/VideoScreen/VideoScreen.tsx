import React from "react";
import { Text, SafeAreaView, ActivityIndicator } from "react-native";
import { Video } from "expo-av";
import { Colors } from "src/styles/colors";
import { styles } from "./VideoScreen.styles";
import { withVideo, Response } from "./graphql/queries";
import ErrorState from "src/components/ErrorState/ErrorState";

interface Props extends Response {}

function VideoScreen(props: Props) {
  const { video, loading, error } = props;

  if (loading && !video) {
    return (
      <ActivityIndicator testID="loader" size="large" color={Colors.grey} />
    );
  }

  if (error) {
    return <ErrorState />;
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
