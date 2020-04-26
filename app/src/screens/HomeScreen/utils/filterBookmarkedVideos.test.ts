import { filterBookmarkedVideos } from "./filterBookmarkedVideos";
import videos from "src/mocks/data/videos.json";

describe("filterBookmarkedVideos", () => {
  it("returns properly filtered array of bookmarked videos", () => {
    const mockBookmarked = ["001", "002"];
    const filteredVideos = filterBookmarkedVideos(videos, mockBookmarked);
    const mockedResult = [videos[0], videos[1]];

    expect(filteredVideos).toMatchObject(mockedResult);
  });

  it("returns an empty array if there are no matching keys", () => {
    const mockBookmarked = ["004"];
    const filteredVideos = filterBookmarkedVideos(videos, mockBookmarked);

    expect(filteredVideos).toMatchObject([]);
  });

  it("returns an empty array if videos list is empty", () => {
    const mockBookmarked = ["004"];
    const filteredVideos = filterBookmarkedVideos([], mockBookmarked);

    expect(filteredVideos).toMatchObject([]);
  });
});
