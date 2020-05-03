import React, { useContext, FC } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./HomeScreen.styles";
import { withVideos, Response } from "./graphql/queries";
import VideoTile from "./components/VideoTile/VideoTile";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import TopBar from "./components/TopBar/TopBar";
import AppState from "src/components/AppState/AppState";
import { ErrorState } from "src/components/ErrorState/ErrorState";
import Loader from "src/components/Loader/Loader";
import { BookmarkContext } from "src/hooks/useBookmarks/useBookmarks";
import { Screens } from "src/types/types";
import { filterBookmarkedVideos } from "./utils/filterBookmarkedVideos";

interface Props extends Response {
  screenType?: string;
}

const HomeScreen: FC<Props> = ({ videos = [], loading, error }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookmarks } = useContext(BookmarkContext);
  const routeHome = route.name === Screens.home;
  const videosList = routeHome
    ? videos
    : filterBookmarkedVideos(videos, bookmarks || []);

  if (error) {
    return <ErrorState />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!videos.length || (!routeHome && !videosList.length)) {
    return <AppState testID="emptyState" title="There's nothing here, yet." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <FlatList
        style={styles.list}
        testID="videoList"
        data={videosList}
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
};

export default withVideos(HomeScreen);
