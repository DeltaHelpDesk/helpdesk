import ApolloClient from "apollo-boost";
import resolvers from "./resolvers.js";
import typeDefs from "./typedefs.js";

const client = new ApolloClient({
  uri: "http://backend:3000/graphql",
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
