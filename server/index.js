const {
  ApolloServer,
  gql
} = require('apollo-server');
const videos = require('./videos.json');

const typeDefs = gql `
  type Video {
    id: String
    title: String
    description: String
    thumbnail: String
    url: String
  }

  type Query {
    videos: [Video]
    video(id: ID!): Video
  }
`;

const resolvers = {
  Query: {
    videos: () => videos,
    video: (parent, args) => {
      return videos.find((video) => video.id === args.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen({
    port: 5000,
  })
  .then(({
    url
  }) => {
    console.log(`🚀  Server ready at ${url}`);
  });