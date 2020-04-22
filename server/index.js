const { ApolloServer, gql } = require('apollo-server');
const movies = require('./movies.json');

const typeDefs = gql`
  type Movie {
    id: String
    title: String
    description: String
    thumbnail: String
    url: String
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => movies,
    movie: (parent, args) => {
      return movies.find((movie) => movie.id === args.id);
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
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
