import gql from 'graphql-tag';



export const TASK_DETAIL = gql`
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
`