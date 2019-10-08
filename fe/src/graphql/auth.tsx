import gql from "graphql-tag";
import client from './client';
import * as React from 'react';
// import MicrosoftAuthService from '../services/microsoft';
import Cookies from 'universal-cookie';
import { UserTokenCookieKey } from "../Global/Keys";

const cookies = new Cookies();

export const isLoggedIn = () => {
    return !!lastToken;
};

export let lastToken: string | null = cookies.get(UserTokenCookieKey);
// export let lastToken: string | null = localStorage.getItem('token');

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

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

export const UserRoleAscendency = [
    UserRole.DEFAULT,
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
];

export interface IAuthContextValue {
    user: IUser | undefined;
    officeToken: null | string;
    token: null | string;
    isLoggedIn: boolean;
    login: () => Promise<string> | undefined;
    logout: () => Promise<void> | undefined;
    loading: boolean;
}

export function checkUserRole(userRole: UserRole, requiredUserRole: UserRole) {
    const requiredRoleIndex = UserRoleAscendency.findIndex(role => role === requiredUserRole);
    const userRoleIndex = UserRoleAscendency.findIndex(role => role === userRole);
    return userRoleIndex >= requiredRoleIndex;
}

const defaultContextValue: IAuthContextValue = { officeToken: null, token: null, isLoggedIn: false, login: () => undefined, user: undefined, loading: true, logout: () => undefined };
export let lastContextValue: IAuthContextValue = defaultContextValue; // get last context value for things outside of react context, should not be used normally!!!!!!!!!
export const ReactAuthContext = React.createContext<IAuthContextValue>(defaultContextValue);

class AuthContextProvider extends React.Component<{}, IAuthContextValue> {
    // microsoftAuthService = new MicrosoftAuthService();
    constructor(props: {}) {
        super(props);
        this.state = { ...defaultContextValue, login: this.login, logout: this.logout };
    }

    logout = async () => {
        try {
            await client.mutate({
                mutation: LOGOUT,
            });
        } catch {
            /// Vynucení smazání tokenu
        }
        this.setToken(null);

        window.location.reload();
    };

    login = async () => {
        // await this.microsoftAuthService.login();
        // return await this.loginByOffice((await this.microsoftAuthService.getToken()) as string);
        return '';
    }




    getSessionUser = async (): Promise<IUser> => {
        const { data: { session } }: any = await client.query({
            query: GET_SESSION
        });
        this.setState({ user: session });
        return session;
    }

    seeIfSessionIsValid = async () => {
        try { await this.getSessionUser(); } catch (e) { this.setToken(undefined); }
    }

    async componentDidMount() {

        const token = this.getToken();
        //const token = localStorage.getItem('token');
        if (token) {
            this.setToken(token);
            this.seeIfSessionIsValid();

        }
        this.setState({ loading: false });
        setInterval(this.seeIfSessionIsValid, 15 * 60 * 1000); // see if session is valid and update user info every 15 mins
    }

    getToken = (): string | null => {
        const cookies = new Cookies();
        const token: string | null = cookies.get(UserTokenCookieKey);

        return token;
    }

    setToken = (token: string | undefined | null) => {
        const cookies = new Cookies();
        if (token) {
            lastToken = token;
            this.setState({ token, isLoggedIn: true, loading: false });

            cookies.set(UserTokenCookieKey, token, { path: '/', maxAge: 60 * 60 * 24 });
            // localStorage.setItem('token', token);
        } else {
            lastToken = null;
            this.setState({ isLoggedIn: false, token: null, user: undefined });

            cookies.remove(UserTokenCookieKey);
            // localStorage.removeItem('token');
        }
    }

    render() {
        lastContextValue = this.state;
        return <ReactAuthContext.Provider value={this.state}>{this.props.children}</ReactAuthContext.Provider>;
    }
}

export const AuthContext = { Provider: AuthContextProvider, Consumer: ReactAuthContext.Consumer };