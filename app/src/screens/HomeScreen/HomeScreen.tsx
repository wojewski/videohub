import React from "react";
import { Text, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./HomeScreen.styles";
import { Colors } from "src/styles/colors";
import { withVideos, Response } from "./graphql/queries";
import VideoTile from "src/components/VideoTile/VideoTile";
import { useNavigation } from "@react-navigation/native";
import ErrorState from "src/components/ErrorState/ErrorState";

interface Props extends Response {}

function HomeScreen(props: Props) {
  const navigation = useNavigation();
  const { videos, loading, error } = props;

  if (loading && videos && !videos.length) {
    return (
      <ActivityIndicator testID="loader" size="large" color={Colors.grey} />
    );
  }

  if (error) {
    return <ErrorState />;
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
    </SafeAreaView>
  );
}

export default withVideos(HomeScreen);
