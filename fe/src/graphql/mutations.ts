import { gql } from "apollo-boost";

export const createUserEmailMutation = gql`
mutation createUserEmail($email: String!, $password: String!, $fullName: String!) {
    createUserEmail(email: $email, password: $password, fullName: $fullName){
        email
    }
}
`;

export const removeUserMutation = gql`
  mutation removeUser($email: String!) {
    removeUser(email: $email)
  }
`;

export const addComment = gql`
mutation AddComment($taskId: ID!, $message: String!) {
	addComment(taskId: $taskId, message: $message) {
    id
  }
}`;

export const removeComment = gql`mutation DeleteComment($id: ID!) {
  deleteComment(subTaskId: $id)
}`;

export const addTaskMutation = gql`
    mutation addTask($subject: String!, $issue: String!, $assigneeId: ID) {
        addTask(subject: $subject, issue: $issue, assigneeId: $assigneeId){
            id
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

export const changeTaskMutation = gql`
    mutation changeTaskState($taskId: ID, $comment: String, $state: State,$assigneeId: ID) {
        changeTaskState(taskId: $taskId, comment: $comment,state: $state, assigneeId: $assigneeId){
            id
        }
    }
`;

export const deleteTaskMutation = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId)
  }
`;

export const logoutMutation = gql`
  mutation logout {
    logout
  }
`;

export const updateTaskBoardQuery = gql`mutation changeTaskBoardState(
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

export const loginEmailMutation = gql`
  mutation loginEmail($email: String!, $password: String!) {
    loginEmail(email: $email, password: $password) {
      token
    }
  }
`;

export const loginExternalMutation = gql`
  mutation loginExternal($email: String!, $name: String!, $provider: AuthType!, $token: String! ) {
    loginExternal(email: $email, name: $name, provider: $provider, token: $token) {
      token
    }
  }
`;

export const loginOfficeMutation = gql`
  mutation loginOffice($token: String!) {
    loginOffice(token: $token) {
      token
    }
  }
`;
