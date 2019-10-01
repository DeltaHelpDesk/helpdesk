import ApolloClient from "apollo-boost";
import resolvers from "./resolvers.js";
import typeDefs from "./typedefs.js";
import { lastToken, isLoggedIn, lastContextValue } from './auth';
import { ServerError } from 'apollo-link-http-common';
import fetcher from 'node-fetch';

const apiUri = 'https://delta-helpdesk.herokuapp.com/graphql';

const client = new ApolloClient({
    uri: apiUri,
    fetch: fetcher,
    request: async (operation) => {
        if (isLoggedIn()) {
            operation.setContext({
                headers: {
                    Authorization: `Bearer ${lastToken}`
                }
            });
        }
    },
    onError({ networkError, response, forward, operation, ...other }) {
        if ((networkError && (networkError as ServerError).statusCode === 401) || (response && response.errors && (response.errors[0].message as any).statusCode === 401)) {
            if (operation.operationName !== 'logout') {
                lastContextValue.logout();
            }
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
