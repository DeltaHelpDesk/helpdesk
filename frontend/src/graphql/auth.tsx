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
  {
    session {
      token
    }
  }
`;

interface IAuthContextValue {
  officeToken: null | string;
  token: null | string;
  isLoggedIn: boolean;
  loginByOffice: (token: string) => any;
  loginByEmail: (email: string, password: string) => any;
  doLoginOffice: () => any;
}

const defaultContextValue = { officeToken: null, token: null, isLoggedIn: false, loginByOffice: () => null,  loginByEmail: () => null, doLoginOffice: () => null };
export const ReactAuthContext = React.createContext<IAuthContextValue>(defaultContextValue);

class AuthContextProvider extends React.Component<{}, IAuthContextValue> {
  microsoftAuthService = new MicrosoftAuthService();
  constructor(props: {}) {
    super(props);
    this.state = { ...defaultContextValue, loginByOffice: this.loginByOffice, loginByEmail: this.loginByEmail, doLoginOffice: this.doLoginOffice };
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
    return loginByEmailQuery.token;
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if(token) {
      this.setToken(token);
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