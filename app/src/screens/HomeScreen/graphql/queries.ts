import gql from "graphql-tag";
import { withQuery, ChildDataProps } from "react-apollo";
import { Video } from "src/types/types";

export const videosQuery = gql`
  query {
    videos {
      id
      title
      thumbnail
    }
  }
`;

export interface Response {
  videos: Video[];
  loading: boolean;
  error?: Error;
}

type ChildProps = ChildDataProps<Response>;

export const withVideos = withQuery(videosQuery, {
  props: ({ data }) => {
    return { ...data } as ChildProps;
  },
});
