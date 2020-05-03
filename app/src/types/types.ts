export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

export enum Screens {
  home = "Home",
  bookmarks = "Bookmarks",
  video = "Video",
}
