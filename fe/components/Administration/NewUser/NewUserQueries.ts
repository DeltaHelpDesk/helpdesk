import gql from 'graphql-tag';



export const ADD_USER = gql`
    mutation createUserEmail($email: String!, $password: String!, $fullName: String!) {
        createUserEmail(email: $email, password: $password, fullName: $fullName){
            email
        }
    }
`
