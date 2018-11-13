import ApolloClient from "apollo-boost";
import resolvers from "./resolvers.js";
import typeDefs from "./typedefs.js";

const client = new ApolloClient({
  // uri: "https://w5xlvm3vzz.lp.gql.zone/graphql", TBA - waiting for backend
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
