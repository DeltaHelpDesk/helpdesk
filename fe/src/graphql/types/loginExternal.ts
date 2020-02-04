/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AuthType } from "./../graphql-global-types";

// ====================================================
// GraphQL mutation operation: loginExternal
// ====================================================

export interface loginExternal_loginExternal {
  __typename: "AuthenticatedUser";
  token: string;
  language: string;
  theme: string | null;
}

export interface loginExternal {
  loginExternal: loginExternal_loginExternal | null;
}

export interface loginExternalVariables {
  email: string;
  name: string;
  provider: AuthType;
  token: string;
}
