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
    }
    assignee {
      id
      fullName
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

