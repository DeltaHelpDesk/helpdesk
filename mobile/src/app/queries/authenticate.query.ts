import gql from "graphql-tag";

export const EmailAuthMutation = gql`
  mutation EmailAuth($email: String!, $password: String!) {
    loginEmail(email: $email, password: $password) {
      id,
      fullName,
      token
    }
  }
`;
