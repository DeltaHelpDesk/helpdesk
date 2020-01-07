/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../graphql-global-types";

// ====================================================
// GraphQL mutation operation: EditUserAdmin
// ====================================================

export interface EditUserAdmin_adminEditUser {
  __typename: "User";
  id: string;
}

export interface EditUserAdmin {
  adminEditUser: EditUserAdmin_adminEditUser | null;
}

export interface EditUserAdminVariables {
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
}
