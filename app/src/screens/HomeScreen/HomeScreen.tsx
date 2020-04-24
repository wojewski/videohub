import React from "react";
import { Text, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./HomeScreen.styles";
import { Colors } from "src/styles/colors";
import { withVideos } from "./graphql/queries";
import { Video } from "src/types/types";
import VideoTile from "src/components/VideoTile/VideoTile";
import { useNavigation } from "@react-navigation/native";

interface Props {
  videos: Video[];
  loading: boolean;
}

function HomeScreen(props: Props) {
  const navigation = useNavigation();
  const { videos, loading } = props;
  return (
    <SafeAreaView style={styles.container}>
      {loading && videos && !videos.length ? (
        <ActivityIndicator testID="loader" size="large" color={Colors.grey} />
      ) : (
        <>
          <Text style={styles.text}>VideoHub</Text>
          <FlatList
            testID="videoList"
            data={videos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <VideoTile
                onPress={() =>
                  navigation.navigate("VideoScreen", {
                    id: item.id,
                  })
                }
                {...item}
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

export default withVideos(HomeScreen);
