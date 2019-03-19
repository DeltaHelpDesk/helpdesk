import { Injectable } from '@angular/core';
import { EmailAuth_loginEmail, EmailAuthVariables } from "../types/types";
import { Apollo } from "apollo-angular";
import { EmailAuthMutation } from "../queries/authenticate.query";
import { tap } from "rxjs/operators";
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  public user = new BehaviorSubject<EmailAuth_loginEmail | null>(null);

  constructor(private apollo: Apollo, private storage: Storage) {
  }

  getAuthenticatedUser(): Promise<EmailAuth_loginEmail> {
    return this.storage.get('user');
  }

  async logout(): Promise<void> {
    await this.storage.remove('user');
    this.user.next(null);
  }

  public emailLogin(credentials: EmailAuthVariables) {
    return this.apollo.mutate({
      mutation: EmailAuthMutation,
      variables: credentials
    }).pipe(
      tap(({data}) => {
        this.storage.set('user', data.loginEmail);
        this.user.next(data.loginEmail);
      })
    )
  }
}
