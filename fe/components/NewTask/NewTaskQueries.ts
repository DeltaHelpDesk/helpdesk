import gql from "graphql-tag";

export const ADD_TASK = gql`
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

export const ADMINS = gql`
    {
        admins {
            id
            fullName
        }
    }
`;