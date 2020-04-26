import { useState, useEffect, createContext } from "react";
import StorageManager from "src/utils/StorageManager/StorageManager";
import { Storage } from "src/constants/storage";

export const storageManager = new StorageManager();

function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[] | null>();

  const updateBookmarks = async (): Promise<void> => {
    const list = await bookmarksList();

    if (list) {
      setBookmarks(JSON.parse(list));
    }
  };

  useEffect(() => {
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

    await updateBookmarks();
  };

  return {
    bookmarks,
    isBookmarked,
    onBookmarkAction,
  };
}

export default useBookmarks;

interface Bookmarks {
  isBookmarked: (id: string) => boolean;
  onBookmarkAction: (isBookmarked: boolean, id: string) => Promise<void>;
  bookmarks: string[] | null | undefined;
}

export const BookmarkContext = createContext({} as Bookmarks);
