/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAdmins
// ====================================================

export interface getAdmins_admins {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface getAdmins {
  admins: (getAdmins_admins | null)[] | null;
}
