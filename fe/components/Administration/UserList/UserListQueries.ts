import gql from "graphql-tag";

export const GET_USER = gql`
{
  users {
    id
    fullName
    email
    created_at
    updated_at
    role
  }
}
`;

export const DELETE_USER = gql`
  mutation removeUser($email: String!) {
    removeUser(email: $email)
  }
`;
