import gql from "graphql-tag";

export const getUsersQuery = gql`
query getUsers{
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

export const getAdminsQuery = gql`
    query getAdmins {
        admins {
            id
            fullName
        }
    }
`;

export const taskDetailQuery = gql`
    query getTask($id: ID!) {
        task(id: $id){
            id
            subject
            issue
            state
            created_at
            author {
                id
                fullName
            }
            assignee {
                id
                fullName
            }
            logs {
                id
                author {
                    id
                    fullName
                }
                created_at
                comment
                state
                assignee {
                    fullName
                }
            }
        }
    }
`;

export const getTaskDetail = gql`
query GetTaskDetail($id: ID!) {
  task(id: $id) {
    subject
    issue
    author {
      fullName
      role
    }
    created_at
    updated_at
    state
    comments {
      author {
        fullName
        role
      }
      created_at
      updated_at
      message
    }
  }
}
`;

export const getTaskComments = gql`
query GetTaskComments($id: ID!) {
  task(id: $id) {
    comments {
      author {
        fullName
        role
      }
      created_at
      updated_at
      message
    }
  }
}`;

export const getTasksQuery = gql`
query getTasks{
  tasks {
    id
    subject
    issue
    state
    created_at
    author {
      id
      fullName
      role
    }
    assignee {
      id
      fullName
      role
    }
  }
}
`;

export const getSessionQuery = gql`
  query getSession {
    session {
      id
      fullName
      email
      role
      token
    }
  }
`;
