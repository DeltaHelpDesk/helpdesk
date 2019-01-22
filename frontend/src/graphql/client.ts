import ApolloClient from "apollo-boost";
import resolvers from "./resolvers.js";
import typeDefs from "./typedefs.js";
import { lastToken, isLoggedIn } from './auth';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  request: async (operation) => {
    if(isLoggedIn()) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${lastToken}`
        }
      });
    }
  },
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
