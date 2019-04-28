import { Injectable } from '@angular/core';
import { EmailAuth_loginEmail, EmailAuthVariables } from "../types/types";
import { Apollo } from "apollo-angular";
import { EmailAuthMutation } from "../queries/authenticate.query";
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private apollo: Apollo, private storage: Storage) {
  }

  getAuthenticatedUser(): Promise<EmailAuth_loginEmail> {
    return this.storage.get('user');
  }

  public emailLogin(credentials: EmailAuthVariables) {
    return this.apollo.mutate({
      mutation: EmailAuthMutation,
      variables: credentials
    })
  }
}
