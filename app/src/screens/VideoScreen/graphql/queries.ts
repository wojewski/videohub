import gql from "graphql-tag";
import { ChildDataProps, withQuery } from "react-apollo";
import { Route } from "react-native";
import { Video } from "src/types/types";

export const videoQuery = gql`
  query($id: ID!) {
    video(id: $id) {
      id
      title
      thumbnail
      url
      description
    }
  }
`;

interface InputProps {
  route: {
    params: {
      id: string;
    };
  };
}

export interface Response {
  video: Video;
  loading: boolean;
  error?: Error;
}

type Variables = {
  id: string;
};

type ChildProps = ChildDataProps<Response>;

export const withVideo = withQuery<InputProps, Response, Variables, ChildProps>(
  videoQuery,
  {
    options: (props: Route) => {
      return {
        variables: {
          id: props.route.params.id,
        },
      };
    },
    props: ({ data }) => {
      return { ...data } as ChildProps;
    },
  }
);
