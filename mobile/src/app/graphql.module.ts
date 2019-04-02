import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { Storage } from "@ionic/storage";
import { setContext } from 'apollo-link-context';

const uri = environment.GraphQLURI;

export function createApollo(httpLink: HttpLink, storage: Storage) {
  const http = httpLink.create({uri});

  const auth = setContext(async (_, {headers}) => {
    const user = await storage.get('user');

    return {
      headers: {
        ...headers,
        ...(user && {Authorization: `Bearer ${user.token}`})
      }
    }
  });

  return {
    link: auth.concat(http),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    }
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, Storage],
    },
  ],
})
export class GraphQLModule {
}
