import { Injectable } from '@angular/core';
import { EmailAuth, EmailAuthVariables } from "../types/types";
import { Apollo } from "apollo-angular";
import { EmailAuthMutation } from "../queries/authenticate.query";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private apollo: Apollo) {
  }

  public emailLogin(credentials: EmailAuthVariables) {
    return this.apollo.mutate({
      mutation: EmailAuthMutation,
      variables: credentials
    })
      .pipe(
      tap(data => console.log(data))
    )
  }
}
