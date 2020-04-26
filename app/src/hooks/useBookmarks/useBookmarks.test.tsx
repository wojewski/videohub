import { renderHook } from "@testing-library/react-hooks";
import useBookmarks, { storageManager } from "./useBookmarks";
import { Storage } from "src/constants/storage";

// In order to silent AsyncStorage source error
console.error = jest.fn();

const mockReturnValues = {
  videos: JSON.stringify(["001", "002", "003", "004"]),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("useBookmarks", () => {
  it("sets and returns the proper value of bookmarks from storageManager", async () => {
    jest
      .spyOn(storageManager, "retrieveData")
      .mockImplementation(() => Promise.resolve(mockReturnValues.videos));

    const { result, waitForNextUpdate } = await renderHook(() =>
      useBookmarks()
    );

    expect(result.current.bookmarks).not.toBeDefined();

    await waitForNextUpdate();

    expect(result.current.bookmarks).toMatchObject(
      JSON.parse(mockReturnValues.videos)
    );
  });

  it("isBookmarked returns true if a value exists in the bookmark list", async () => {
    const { result, waitForNextUpdate } = await renderHook(() =>
      useBookmarks()
    );

    await waitForNextUpdate();
    expect(result.current.isBookmarked("001")).toBe(true);
  });

  it("isBookmarked returns false if the value does not exist in the bookmark list", async () => {
    const { result, waitForNextUpdate } = await renderHook(() =>
      useBookmarks()
    );

    await waitForNextUpdate();
    expect(result.current.isBookmarked("005")).toBe(false);
  });

  it("onBookmarkAction tiggers earseGroupItem if isBookmarked equals true", async () => {
    const { result, waitForNextUpdate } = await renderHook(() =>
      useBookmarks()
    );

    const earseGroupItemSpy = jest.spyOn(storageManager, "earseGroupItem");
    const storeGroupDataSpy = jest.spyOn(storageManager, "storeGroupData");

    result.current.onBookmarkAction(true, "001");

    await waitForNextUpdate();
    expect(earseGroupItemSpy).toHaveBeenCalledWith(Storage.videos, "001");
    expect(storeGroupDataSpy).not.toHaveBeenCalled();
  });

  it("onBookmarkAction triggers storeGroupData if isBookmarked equals false", async () => {
    const { result, waitForNextUpdate } = await renderHook(() =>
      useBookmarks()
    );

    const earseGroupItemSpy = jest.spyOn(storageManager, "earseGroupItem");
    const storeGroupDataSpy = jest.spyOn(storageManager, "storeGroupData");

    result.current.onBookmarkAction(false, "005");

    await waitForNextUpdate();
    expect(storeGroupDataSpy).toHaveBeenCalledWith(Storage.videos, "005");
    expect(earseGroupItemSpy).not.toHaveBeenCalled();
  });
});
