import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { environment } from '../environments/environment';
import { Storage } from "@ionic/storage";
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { ToastController } from "@ionic/angular";
import { InMemoryCache } from "apollo-cache-inmemory";
import { UserService } from "./services/user.service";
import { Router } from "@angular/router";


const uri = environment.GraphQLURI;

export function createApollo(
  httpLink: HttpLink,
  storage: Storage,
  userService: UserService,
  toastController: ToastController,
  router: Router
) {
  const http = httpLink.create({uri});

  // Add Authorization: Bearer {jwtToken} | to every GraphQL request
  const auth = setContext(async (_, {headers}) => {
    const user = await storage.get('user');

    return {
      headers: {
        ...headers,
        ...(user && {Authorization: `Bearer ${user.token}`})
      }
    }
  });

  // Handle Unauthorized error from GraphQL backend
  const authorization = onError(({graphQLErrors, networkError, response, operation, forward}) => {
    if (response && response.errors) {
      response.errors.map(async error => {
        if (error.message && error.message.statusCode && error.message.statusCode === 401) {

          userService.logout();
          router.navigate(['/authenticate'])

          const toast = await toastController.create({
            message: "Byl jste odhlášen",
            duration: 5000
          });

          toast.present()
        }
      })

    }
  });

  return {
    link: authorization.concat(auth.concat(http)),
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
      deps: [HttpLink, Storage, UserService, ToastController, Router]
    },
  ],
})

export class GraphQLModule {
}
