import gql from "graphql-tag";
import client from './client';
import * as React from 'react';
import MicrosoftAuthService from '../services/microsoft';

export const isLoggedIn = () => {
  return !!lastToken;
};

export let lastToken: string | null = null;

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

export enum UserRole {
    DEFAULT = "DEFAULT",
    ADMIN = "ADMIN",
    SUPERADMIN = "SUPERADMIN"
}
export interface IUser {
    email: string;
    fullName: string;
    id: string;
    role: UserRole;
}
export interface IAuthContextValue {
  user: IUser | {};
  officeToken: null | string;
  token: null | string;
  isLoggedIn: boolean;
  loginByOffice: (token: string) => Promise<string> | undefined;
  loginByEmail: (email: string, password: string) => Promise<string> | undefined;
  doLoginOffice: () => Promise<string> | undefined;
  loading: boolean;
}

const defaultContextValue: IAuthContextValue = { officeToken: null, token: null, isLoggedIn: false, loginByOffice: () => undefined,  loginByEmail: () => undefined, doLoginOffice: () => undefined, user: {}, loading: true };
export const ReactAuthContext = React.createContext<IAuthContextValue>(defaultContextValue);

class AuthContextProvider extends React.Component<{}, IAuthContextValue> {
  microsoftAuthService = new MicrosoftAuthService();
  constructor(props: {}) {
    super(props);
    this.state = { ...defaultContextValue, loginByOffice: this.loginByOffice, loginByEmail: this.loginByEmail, doLoginOffice: this.doLoginOffice, user: {} };
  }

  doLoginOffice = async () => {
    await this.microsoftAuthService.login();
    return await this.loginByOffice((await this.microsoftAuthService.getToken()) as string);
  }

  loginByOffice = async (token: string): Promise<string> => {
    // tslint:disable-next-line:no-shadowed-variable
    const { data: { loginOffice: loginByOfficeQuery } }: any = await client.mutate({
      mutation: LOGIN_OFFICE,
      variables: {
        token
      }
    });
    this.setToken(loginByOfficeQuery.token);
    this.getSessionUser();
    return loginByOfficeQuery.token;
  };

  loginByEmail = async (email: string, password: string): Promise<string> => {
    // tslint:disable-next-line:no-shadowed-variable
    const { data: { loginEmail: loginByEmailQuery } }: any = await client.mutate({
      mutation: LOGIN_EMAIL,
      variables: {
        email,
        password
      }
    });
    this.setToken(loginByEmailQuery.token);
    this.getSessionUser();
    return loginByEmailQuery.token;
  };

  getSessionUser = async (): Promise<IUser> => {
    const { data: { session } }: any = await client.query({
        query: GET_SESSION
    });
    this.setState({ user: session });
    return session;
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if(token) {
      this.setToken(token);
      try { await this.getSessionUser(); } catch(e) { this.setToken(undefined); }
      this.setState({loading: false});
    }
  }

  setToken = (token: string | undefined | null) => {
    if(token) {
      lastToken = token;
      this.setState({token, isLoggedIn: true});
      localStorage.setItem('token', token);
    } else {
      lastToken = null;
      this.setState({isLoggedIn: false, token: null});
      localStorage.removeItem('token');
    }
  }

  render() {
    return <ReactAuthContext.Provider value={this.state}>{this.props.children}</ReactAuthContext.Provider>;
  }
}

export const AuthContext = { Provider: AuthContextProvider, Consumer: ReactAuthContext.Consumer };