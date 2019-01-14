import gql from "graphql-tag";
import client from './client';

export const isLoggedIn = () => {
  return !!lastToken;
};
export const setToken = (token: string | undefined | null) => {
  if(token) {
    lastToken = token;
    localStorage.setItem('token', token);
  } else {
    lastToken = null;
    localStorage.removeItem('token');
  }
}
export let lastToken: string | null = null;
setToken(localStorage.getItem('token'))

export const LOGIN_EMAIL = gql`
  mutation loginEmail($email: String!, $password: String!) {
    loginEmail(email: $email, password: $password) {
      token
    }
  }
`;
export const LOGIN_OFFICE = gql`
  mutation loginOffice($token: String!) {
    loginOffice(token: $token) {
      token
    }
  }
`;
export const GET_SESSION = gql`
  {
    session {
      token
    }
  }
`;

export const loginByEmail = async (email: string, password: string): Promise<string> => {
  // tslint:disable-next-line:no-shadowed-variable
  const { data: { loginEmail: loginByEmailQuery } }: any = await client.mutate({
    mutation: LOGIN_EMAIL,
    variables: {
      email,
      password
    }
  });
  setToken(loginByEmailQuery.token);
  return loginByEmailQuery.token;
};

export const loginByOffice = async (token: string): Promise<string> => {
  // tslint:disable-next-line:no-shadowed-variable
  const { data: { loginOffice: loginByOfficeQuery } }: any = await client.mutate({
    mutation: LOGIN_OFFICE,
    variables: {
      token
    }
  });
  setToken(loginByOfficeQuery.token);
  return loginByOfficeQuery.token;
};