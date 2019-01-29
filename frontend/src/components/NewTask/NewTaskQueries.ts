import gql from 'graphql-tag';



export const ADD_TASK = gql`
    mutation addTask($subject: String!, $issue: String!, $assigneeId: ID) {
        addTask(subject: $subject, issue: $issue, assigneeId: $assigneeId){
            id
            subject
            issue
            assignee {
                id
            }
        }
    }
`