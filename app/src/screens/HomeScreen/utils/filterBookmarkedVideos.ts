import { Video } from "src/types/types";

export const filterBookmarkedVideos = (
  videos: Video[],
  bookmarks: string[]
): Video[] => {
  return videos.filter((video: Video) => bookmarks?.includes(video.id));
};
