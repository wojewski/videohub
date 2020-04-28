import React from "react";
import { Text, SafeAreaView } from "react-native";
import { styles } from "./VideoScreen.styles";
import { withVideo, Response } from "./graphql/queries";
import ErrorState from "src/components/ErrorState/ErrorState";
import Loader from "src/components/Loader/Loader";
import BookmarkButton from "src/components/BookmarkButton/BookmarkButton";
import Video from "src/components/Video/Video";

function VideoScreen(props: Response) {
  const { video, loading, error } = props;

  if (loading && !video) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Video url={video.url} id={video.id} testID="videoPlayer" />

      <Text testID="title" style={styles.title}>
        {video.title}
      </Text>
      <Text testID="description">{video.description}</Text>

      <BookmarkButton id={video.id} size={30} />
    </SafeAreaView>
  );
}

export default withVideo(VideoScreen);
