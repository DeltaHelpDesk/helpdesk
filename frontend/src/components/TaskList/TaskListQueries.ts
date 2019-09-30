import gql from "graphql-tag";

export const GET_TASKS = gql`
{
  tasks {
    id
    subject
    issue
    state
    author {
      id
      fullName
    }
    assignee {
      id
      fullName
    }
  }
}
`;

export const DELETE_TASK = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId)
  }
`;