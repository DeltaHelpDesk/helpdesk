import gql from "graphql-tag";

export const GET_TASKS = gql`
{
  tasks {
    id
    issue
    state
    author{
      fullName
    }
    assignee{
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