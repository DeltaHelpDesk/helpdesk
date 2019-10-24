import gql from "graphql-tag";

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
`;

export const CHANGE_TASK_STATE = gql`
    mutation changeTaskState($taskId: ID, $comment: String, $state: State,$assigneeId: ID) {
        changeTaskState(taskId: $taskId, comment: $comment,state: $state, assigneeId: $assigneeId){
            id
        }
    }
`;
