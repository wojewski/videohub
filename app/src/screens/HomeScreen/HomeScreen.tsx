import React, { useEffect } from "react";
import { Text, SafeAreaView, FlatList } from "react-native";
import { styles } from "./HomeScreen.styles";
import { withVideos, Response } from "./graphql/queries";
import VideoTile from "./components/VideoTile/VideoTile";
import { useNavigation } from "@react-navigation/native";
import ErrorState from "src/components/ErrorState/ErrorState";
import Loader from "src/components/Loader/Loader";

interface Props extends Response {}

function HomeScreen(props: Props) {
  const navigation = useNavigation();
  const { videos, loading, error } = props;

  if (error) {
    return <ErrorState />;
  }

  if (loading && videos && !videos.length) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Text style={styles.text}>VideoHub</Text>
        <FlatList
          testID="videoList"
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VideoTile
              {...item}
              onPress={() =>
                navigation.navigate("VideoScreen", {
                  id: item.id,
                })
              }
            />
          )}
        />
      </>
    </SafeAreaView>
  );
}

export default withVideos(HomeScreen);
