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

export const updateTaskBoardQuery = gql`mutation changeTaskState(
    $taskId: ID!
    $comment: String!
    $state: State!
  ) {
    changeTaskState(
      taskId: $taskId
      comment: $comment
      state: $state
    ) {
      id
      subject
      issue
      author {
        id
        fullName
      }
      assignee {
        id
        fullName
      }
      created_at
      updated_at
      state
    }
  }`;

