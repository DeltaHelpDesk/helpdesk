import gql from "graphql-tag";

export const TaskListQuery = gql`
  query TaskList {
    tasks {
      id,
      subject
      author {
        fullName
      }
      assignee {
        fullName
      }
      state
    }
    
  }
`;

export const TaskDetailQuery = gql`
  query TaskDetail($id: ID!) {
    task(id: $id) {
      id,
      subject
      author {
        fullName
      }
      assignee {
        fullName
      }
      state,

      issue,
      created_at
    }
  }
`;
