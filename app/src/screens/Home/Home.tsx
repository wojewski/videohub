import React from "react";
import { Text, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./Home.styles";
import { Colors } from "src/styles/colors";
import { withVideos } from "./graphql/queries";
import { Video } from "./types";
import VideoTile from "src/components/VideoTile/VideoTile";

interface Props {
  videos: Video[];
  loading: boolean;
}

function Home(props: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {props.loading && props.videos && !props.videos.length ? (
        <ActivityIndicator testID="loader" size="large" color={Colors.white} />
      ) : (
        <>
          <Text style={styles.text}>VideoHub</Text>
          <FlatList
            testID="videoList"
            data={props.videos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <VideoTile {...item} />}
          />
        </>
      )}
    </SafeAreaView>
  );
}

export default withVideos(Home);
