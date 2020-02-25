/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginOffice
// ====================================================

export interface loginOffice_loginOffice {
  __typename: "AuthenticatedUser";
  token: string;
  language: string;
  theme: string | null;
}

export interface loginOffice {
  loginOffice: loginOffice_loginOffice | null;
}

export interface loginOfficeVariables {
  token: string;
}
