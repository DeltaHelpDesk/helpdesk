/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../graphql-global-types";

// ====================================================
// GraphQL query operation: getUsers
// ====================================================

export interface getUsers_users {
  __typename: "User";
  id: string;
  fullName: string;
  email: string;
  created_at: any;
  updated_at: any | null;
  role: UserRole | null;
}

export interface getUsers {
  users: (getUsers_users | null)[] | null;
}
