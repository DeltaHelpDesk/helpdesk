import gql from "graphql-tag";

export const AdminListQuery = gql`
  query AdminList {
    admins {
      id,
      fullName
    }
  }
`;
