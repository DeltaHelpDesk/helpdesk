import gql from "graphql-tag";
import client from "./client";
import { createContext, useEffect, FunctionComponent, useState } from "react";
// import MicrosoftAuthService from '../services/microsoft';
import Cookies from "universal-cookie";
import { UserTokenCookieKey } from "../Global/Keys";
import Router from "next/router";
import customRoutes from "../Routes";

const cookies = new Cookies();

export const isLoggedIn = () => {
    return !!lastToken;
};

export let lastToken: string | null = cookies.get(UserTokenCookieKey);

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
    SUPERADMIN = "SUPERADMIN",
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
    loginByEmail: (email: string, password: string) => Promise<string> | undefined;
    // login: () => Promise<string> | undefined;
    logout: () => Promise<void> | undefined;
    loading: boolean;
}

export function checkUserRole(userRole: UserRole, requiredUserRole: UserRole) {
    const requiredRoleIndex = UserRoleAscendency.findIndex((role) => role === requiredUserRole);
    const userRoleIndex = UserRoleAscendency.findIndex((role) => role === userRole);
    return userRoleIndex >= requiredRoleIndex;
}

const defaultContextValue: IAuthContextValue = {
    officeToken: null,
    token: null,
    isLoggedIn: false,
    // login: () => undefined,
    loginByEmail: () => undefined,
    user: undefined,
    loading: true,
    logout: () => undefined,
};

// get last context value for things outside of react context, should not be used normally!!!!!!!!!
export let lastContextValue: IAuthContextValue = defaultContextValue;

export const ReactAuthContext = createContext<IAuthContextValue>(defaultContextValue);

const AuthContextProvider: FunctionComponent<{} | IAuthContextValue> = (props) => {
    // microsoftAuthService = new MicrosoftAuthService();

    const loginByEmail = async (email: string, password: string): Promise<string> => {
        // tslint:disable-next-line:no-shadowed-variable
        const { data: { loginEmail: loginByEmailQuery } }: any = await client.mutate({
            mutation: LOGIN_EMAIL,
            variables: {
                email,
                password,
            },
        });
        setToken(loginByEmailQuery.token);
        // await getSessionUser();
        return loginByEmailQuery.token;
    };

    const logout = async () => {
        try {
            await client.mutate({
                mutation: LOGOUT,
            });
        } catch {
            /// Vynucení smazání tokenu
        }
        setToken(null);
        try {
            if (window) {
                window.localStorage.setItem("logout", Date.now().toString());
                window.location.reload();
            } else {
                Router.push(customRoutes.loginRoute);
            }
            // tslint:disable-next-line:no-empty
        } catch {

        }
    };

    const [state, setState] = useState<IAuthContextValue>({
        ...props,
        loginByEmail,
        logout,
        user: defaultContextValue.user,
        officeToken: defaultContextValue.officeToken,
        token: lastToken,
        isLoggedIn: !!lastToken,
        // token: defaultContextValue.token,
        // isLoggedIn: true, // defaultContextValue.isLoggedIn,
        loading: defaultContextValue.loading,
    });

    useEffect(() => {
        const token = getToken();
        if (token) {
            setToken(token);
            seeIfSessionIsValid();
        }
        setState({
            ...state,
            loading: false,
        });
        setInterval(seeIfSessionIsValid, 15 * 60 * 1000); // see if session is valid and update user info every 15 mins
        // tslint:disable-next-line:no-empty
        return () => {
        };
    }, []);

    // login = async () => {
    //     // await microsoftAuthService.login();
    //     // return await loginByOffice((await microsoftAuthService.getToken()) as string);
    //     return '';
    // }

    const getSessionUser = async (): Promise<IUser> => {
        const { data: { session } }: any = await client.query({
            query: GET_SESSION,
        });
        setState({
            ...state,
            user: session,
        });
        return session;
    };

    const seeIfSessionIsValid = async () => {
        try {
            await getSessionUser();
        } catch (e) {
            setToken(undefined);
        }
    };

    const getToken = (): string | null => {
        // tslint:disable-next-line:no-shadowed-variable
        const cookies = new Cookies();
        const token: string | null = cookies.get(UserTokenCookieKey);
        return token;
    };

    const setToken = (token: string | undefined | null) => {
        // tslint:disable-next-line:no-shadowed-variable
        const cookies = new Cookies();
        if (token) {
            lastToken = token;
            setState({
                ...state,
                token,
                isLoggedIn: true,
                loading: false,
            });

            cookies.set(UserTokenCookieKey, token, { path: "/", maxAge: 60 * 60 * 24 });
        } else {
            lastToken = null;
            setState({
                ...state,
                isLoggedIn: false,
                token: null,
                user: undefined,
            });

            cookies.remove(UserTokenCookieKey);
        }
    };

    lastContextValue = state;
    return (
        <ReactAuthContext.Provider value={state}>
            {props.children}
        </ReactAuthContext.Provider>
    );
};

export const AuthContext = {
    Provider: AuthContextProvider,
    Consumer: ReactAuthContext.Consumer,
};
