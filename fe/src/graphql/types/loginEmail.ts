/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginEmail
// ====================================================

export interface loginEmail_loginEmail {
  __typename: "AuthenticatedUser";
  token: string;
}

export interface loginEmail {
  loginEmail: loginEmail_loginEmail | null;
}

export interface loginEmailVariables {
  email: string;
  password: string;
}
