/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createUserEmail
// ====================================================

export interface createUserEmail_createUserEmail {
  __typename: "User";
  email: string;
}

export interface createUserEmail {
  createUserEmail: createUserEmail_createUserEmail | null;
}

export interface createUserEmailVariables {
  email: string;
  password: string;
  fullName: string;
}
