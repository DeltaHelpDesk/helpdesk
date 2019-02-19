import { Injectable } from '@angular/core';
import { EmailAuthVariables } from "../types/types";
import { Apollo } from "apollo-angular";
import { EmailAuthMutation } from "../queries/authenticate.query";
import { tap } from "rxjs/operators";
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private apollo: Apollo, private storage: Storage) {
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.storage.get('token');
    return !!token;
  }

  async logout(): Promise<void> {
    await this.storage.remove('token')
  }

  public emailLogin(credentials: EmailAuthVariables) {
    return this.apollo.mutate({
      mutation: EmailAuthMutation,
      variables: credentials
    }).pipe(
      tap(({data}) => {
        this.storage.set('token', data.loginEmail.token);
      })
    )
  }
}
