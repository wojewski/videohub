import React from "react";
import { render, fireEvent, act, wait } from "@testing-library/react-native";
import Video, { storageManager } from "./Video";
import video from "src/mocks/data/video.json";
import * as ScreenOrientation from "expo-screen-orientation";

// In order to silent AsyncStorage source error
console.error = jest.fn();

describe("Video", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const id = "001";
  const shape = <Video id={id} url={video.url} testID="video" />;

  it("renders without crashing", () => {
    const { getByTestId } = render(shape);

    expect(getByTestId("video")).toBeDefined();
  });

  it("fullscreenButton triggers ScreenOrientation Landscape and Video reference action", async () => {
    const presentFullscreenPlayerAsync = jest.fn();
    const playerSpy = jest.spyOn(React, "useRef").mockReturnValue({
      current: {
        presentFullscreenPlayerAsync,
      },
    });
    const ScreenOrientationSpy = jest.spyOn(ScreenOrientation, "lockAsync");

    const { getByTestId } = render(shape);

    fireEvent.press(getByTestId("fullscreenButton"));

    await wait();

    expect(playerSpy).toHaveBeenCalled();

    expect(ScreenOrientationSpy).toHaveBeenCalledWith(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  });

  it("backwardButton triggers Video reference action", async () => {
    const setPositionAsync = jest.fn();
    const playerSpy = jest.spyOn(React, "useRef").mockReturnValue({
      current: {
        setPositionAsync,
      },
    });

    const { getByTestId } = render(shape);

    fireEvent.press(getByTestId("backwardButton"));

    await wait();

    expect(playerSpy).toHaveBeenCalled();
  });

  describe("playButton", () => {
    const eraseDataSpy = jest.spyOn(storageManager, "eraseData");
    const storeDataSpy = jest.spyOn(storageManager, "storeData");

    const playAsync = jest.fn();
    const pauseAsync = jest.fn();
    const playerSpy = jest.spyOn(React, "useRef").mockReturnValue({
      current: {
        playAsync,
        pauseAsync,
      },
    });

    const { getByTestId } = render(shape);

    it("sets isPaused state to true and passes video pause data to StoreManager", async () => {
      fireEvent.press(getByTestId("playButton"));

      await act(wait);

      expect(playerSpy).toHaveBeenCalled();
      expect(storeDataSpy).toHaveBeenCalledWith(id, "0");

      fireEvent.press(getByTestId("playButton"));
    });

    it("sets isPaused state to false and erase video data from StoreManager", async () => {
      await act(wait);

      expect(playerSpy).toHaveBeenCalled();
      expect(eraseDataSpy).toHaveBeenCalledWith(id);
    });
  });

  it("backwardButton triggers Video reference action", async () => {
    const setPositionAsync = jest.fn();
    const playerSpy = jest.spyOn(React, "useRef").mockReturnValue({
      current: {
        setPositionAsync,
      },
    });

    const { getByTestId } = render(shape);

    fireEvent.press(getByTestId("forwardButton"));

    await wait();

    expect(playerSpy).toHaveBeenCalled();
  });
});
