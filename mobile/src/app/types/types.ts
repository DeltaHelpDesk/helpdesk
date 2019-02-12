/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EmailAuth
// ====================================================

export interface EmailAuth_loginEmail {
  __typename: "AuthenticatedUser";
  id: string;
  fullName: string;
  token: string;
}

export interface EmailAuth {
  loginEmail: EmailAuth_loginEmail | null;
}

export interface EmailAuthVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
