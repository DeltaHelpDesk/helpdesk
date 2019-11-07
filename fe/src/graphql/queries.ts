import gql from "graphql-tag";

export const tasksBoardQuery = gql`query {
    tasks {
      id
      subject
      issue
      created_at
      state
      assignee {
        id
        fullName
      }
      author {
        id
        fullName
      }
    }
  }`;

