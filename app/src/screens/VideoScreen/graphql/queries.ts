import gql from "graphql-tag";
import { graphql, ChildDataProps } from "react-apollo";
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
}

type Variables = {
  id: string;
};

type ChildProps = ChildDataProps<Response>;

export const withVideo = graphql<InputProps, Response, Variables, ChildProps>(
  videoQuery,
  {
    options: (props) => {
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
