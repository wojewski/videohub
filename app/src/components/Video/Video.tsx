import React, { FC, useState, memo, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./Video.styles";
import * as ScreenOrientation from "expo-screen-orientation";
import { Video, VideoFullscreenUpdateEvent, AVPlaybackStatus } from "expo-av";
import { Colors } from "src/styles/colors";
import StorageManager from "src/utils/StorageManager/StorageManager";

export const storageManager = new StorageManager();

interface Props {
  id: string;
  url: string;
  testID?: string;
}

enum Orientation {
  vertical,
  horizontal,
}

enum Skip {
  forward,
  backward,
}

enum Icons {
  fullscreen = "fullscreen",
  play = "play",
  pause = "pause",
  rewind = "rewind-10",
  forward = "fast-forward-10",
}

const VideoPlayer: FC<Props> = ({ url, id, testID }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const player = React.useRef<Video>(null);

  useEffect(() => {
    retrieveStoragePosition();
  }, []);

  async function retrieveStoragePosition(): Promise<void> {
    const storagePosition = await storageManager.retrieveData(id);

    if (storagePosition && player.current) {
      await player.current.playFromPositionAsync(parseInt(storagePosition, 10));
    }
  }

  async function storePausedPosition(): Promise<void> {
    await storageManager.storeData(id, currentPosition.toString());
  }

  async function handlePlayPause(): Promise<void> {
    if (player.current) {
      if (isPaused) {
        await player.current.playAsync();
        setIsPaused(false);

        return storageManager.eraseData(id);
      }

      await player.current.pauseAsync();
      setIsPaused(true);

      return storePausedPosition();
    }
  }

  async function changeOrientation(orientation: Orientation): Promise<void> {
    if (orientation === Orientation.horizontal) {
      return ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    }

    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  }

  async function onFullscreen(): Promise<void> {
    if (player.current) {
      await player.current.presentFullscreenPlayerAsync();
    }
    await changeOrientation(Orientation.horizontal);
  }

  async function fullscreenUpdate(
    props: VideoFullscreenUpdateEvent
  ): Promise<void> {
    setScreenOrientation(props.fullscreenUpdate);
  }

  async function setScreenOrientation(
    fullscreenUpdateCode: number
  ): Promise<void> {
    if (fullscreenUpdateCode === Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS) {
      await changeOrientation(Orientation.vertical);
    }
  }

  async function onStatusUpdate(status: AVPlaybackStatus): Promise<void> {
    if (status.isLoaded) {
      setCurrentPosition(status.positionMillis);
      await onVideoEnd(status);
    }
  }

  async function onVideoEnd(status: AVPlaybackStatus): Promise<void> {
    if (
      player.current &&
      status.isLoaded &&
      status.positionMillis === status.durationMillis &&
      status.didJustFinish
    ) {
      setIsPaused(true);
      await player.current.stopAsync();
      await storageManager.eraseData(id);
    }
  }

  async function onSkip(skip: Skip) {
    const skipDuration = 10000;

    if (player.current) {
      if (skip === Skip.backward) {
        return player.current.setPositionAsync(currentPosition - skipDuration);
      }

      return player.current.setPositionAsync(currentPosition + skipDuration);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.controlsTop}>
        <TouchableOpacity onPress={onFullscreen} testID="fullscreenButton">
          <MaterialCommunityIcons
            name={Icons.fullscreen}
            size={30}
            color={Colors.blue}
          />
        </TouchableOpacity>
      </View>

      <Video
        ref={player}
        style={styles.video}
        shouldPlay={true}
        source={{ uri: url }}
        resizeMode="contain"
        useNativeControls={false}
        onFullscreenUpdate={fullscreenUpdate}
        onPlaybackStatusUpdate={onStatusUpdate}
        testID={testID}
      />

      <View style={styles.controlsBottom}>
        <TouchableOpacity
          onPress={() => onSkip(Skip.backward)}
          testID="backwardButton"
        >
          <MaterialCommunityIcons
            name={Icons.rewind}
            size={30}
            color={Colors.blue}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayPause} testID="playButton">
          <MaterialCommunityIcons
            name={isPaused ? Icons.play : Icons.pause}
            size={50}
            color={Colors.blue}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSkip(Skip.forward)}
          testID="forwardButton"
        >
          <MaterialCommunityIcons
            name={Icons.forward}
            size={30}
            color={Colors.blue}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(VideoPlayer);
