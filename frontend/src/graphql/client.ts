import ApolloClient from "apollo-boost";
import resolvers from "./resolvers.js";
import typeDefs from "./typedefs.js";
import { lastToken, isLoggedIn, lastContextValue } from './auth';
import { ServerError } from 'apollo-link-http-common';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  request: async (operation) => {
    if(isLoggedIn()) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${lastToken}`
        }
      });
    }
  },
  onError({ networkError, response, forward, operation, ...other }) {
    if ((networkError && (networkError as ServerError).statusCode === 401) || (response && response.errors && (response.errors[0].message as any).statusCode === 401)) {
        lastContextValue.logout();
    }
    console.error("GraphQL onError handle", { networkError, response, operation, ...other });
    forward(operation);
  },
  clientState: {
    defaults: {},
    resolvers,
    typeDefs
  }
});

export default client;
