import React, { FC, useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./VideoScreen.styles";
import { withVideo, Response } from "./graphql/queries";
import { ErrorState } from "src/components/ErrorState/ErrorState";
import Loader from "src/components/Loader/Loader";
import BookmarkButton from "src/components/BookmarkButton/BookmarkButton";
import Video from "src/components/Video/Video";
import * as ScreenOrientation from "expo-screen-orientation";
import { useQuery } from "react-apollo";

const VideoScreen: FC<Response> = ({ video, loading, error }) => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  if (loading && !video) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Video url={video.url} id={video.id} testID="videoPlayer" />
      <View style={styles.content}>
        <View style={styles.action}>
          <BookmarkButton id={video.id} size={30} />
        </View>
        <Text testID="title" style={styles.title}>
          {video.title}
        </Text>
        <Text testID="description">{video.description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default withVideo(VideoScreen);
