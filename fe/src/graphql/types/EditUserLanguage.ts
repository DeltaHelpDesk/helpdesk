/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditUserLanguage
// ====================================================

export interface EditUserLanguage_editUser {
  __typename: "User";
  id: string;
}

export interface EditUserLanguage {
  editUser: EditUserLanguage_editUser | null;
}

export interface EditUserLanguageVariables {
  language: string;
}
