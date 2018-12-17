import ApolloClient from "apollo-boost";
import resolvers from "./resolvers.js";
import typeDefs from "./typedefs.js";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  clientState: {
    defaults: {
      testMessage: "Ahoj",
      todos: []
    },
    resolvers,
    typeDefs
  }
});

export default client;
