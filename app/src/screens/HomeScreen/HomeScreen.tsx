import React, { useContext } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { styles } from "./HomeScreen.styles";
import { withVideos, Response } from "./graphql/queries";
import VideoTile from "./components/VideoTile/VideoTile";
import { useNavigation } from "@react-navigation/native";
import ErrorState from "src/components/ErrorState/ErrorState";
import Loader from "src/components/Loader/Loader";
import { BookmarkContext } from "src/hooks/useBookmarks/useBookmarks";
import { Screens } from "src/types/types";
import { filterBookmarkedVideos } from "./utils/filterBookmarkedVideos";
import { useRoute } from "@react-navigation/native";

interface Props extends Response {
  screenType?: string;
}

function HomeScreen(props: Props) {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookmarks } = useContext(BookmarkContext);
  const { videos = [], loading, error } = props;

  if (error) {
    return <ErrorState />;
  }

  if (loading && videos && !videos.length) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        testID="videoList"
        data={
          route.name === Screens.home
            ? videos
            : filterBookmarkedVideos(videos, bookmarks || [])
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoTile
            {...item}
            onPress={() =>
              navigation.navigate(Screens.video, {
                id: item.id,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

export default withVideos(HomeScreen);
