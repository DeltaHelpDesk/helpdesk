/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../graphql-global-types";

// ====================================================
// GraphQL query operation: getSession
// ====================================================

export interface getSession_session {
  __typename: "AuthenticatedUser";
  id: string;
  fullName: string;
  email: string;
  role: UserRole | null;
  token: string;
}

export interface getSession {
  session: getSession_session | null;
}
