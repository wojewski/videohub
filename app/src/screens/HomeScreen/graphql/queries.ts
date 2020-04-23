import gql from "graphql-tag";
import { graphql, ChildDataProps } from "react-apollo";
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
}

type ChildProps = ChildDataProps<Response>;

export const withVideos = graphql(videosQuery, {
  props: ({ data }) => {
    return { ...data } as ChildProps;
  },
});
