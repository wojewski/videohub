import { useState, useEffect } from "react";
import StorageManager from "src/utils/StorageManager/StorageManager";
import { Storage } from "src/constants/storage";

export const storageManager = new StorageManager();

function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[] | null>();

  useEffect(() => {
    const updateBookmarks = async (): Promise<void> => {
      const list = await bookmarksList();

      if (list) {
        setBookmarks(JSON.parse(list));
      }
    };
    updateBookmarks();
  }, []);

  const bookmarksList = async (): Promise<string | null> => {
    return await storageManager.retrieveData(Storage.videos);
  };

  const isBookmarked = (id: string): boolean => {
    return bookmarks?.includes(id) || false;
  };

  const onBookmarkAction = async (
    isBookmarked: boolean,
    id: string
  ): Promise<void> => {
    isBookmarked
      ? await storageManager.earseGroupItem(Storage.videos, id)
      : await storageManager.storeGroupData(Storage.videos, id);
  };

  return {
    bookmarks,
    isBookmarked,
    onBookmarkAction,
  };
}

export default useBookmarks;
