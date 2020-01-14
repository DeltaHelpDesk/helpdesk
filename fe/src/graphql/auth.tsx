import client from "./client";
import { createContext, useEffect, FunctionComponent, useState } from "react";
import MicrosoftAuthService from "../services/microsoft";
import Cookies from "universal-cookie";
import { UserTokenCookieKey } from "../Global/Keys";
import Router from "next/router";
import customRoutes from "../Routes";
import { loginEmailMutation, loginExternalMutation, loginOfficeMutation, logoutMutation } from "./mutations";
import { getSessionQuery } from "./queries";
import { getSession, getSession_session } from "./types/getSession";
import { UserRole, AuthType } from "./graphql-global-types";
import CookieHelper from "../../utils/cookieHelper";

const cookies = new Cookies();

export const isLoggedIn = () => {
    return !!lastToken;
};

export let lastToken: string | null = cookies.get(UserTokenCookieKey);

export const UserRoleAscendency = [
    UserRole.DEFAULT,
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
];

export interface IAuthContextValue {
    user: getSession_session | undefined;
    officeToken: null | string;
    token: null | string;
    isLoggedIn: boolean;
    loginExternal: (email: string, name: string, provider: AuthType, token: string) => Promise<string> | undefined;
    loginByEmail: (email: string, password: string) => Promise<string> | undefined;
    loginByMicrosoft: (token: string) => Promise<string> | undefined;
    doLoginByMicrosoft: () => Promise<string> | undefined;
    logout: () => Promise<void> | undefined;
    isInRole: (requiredRole: UserRole) => boolean;
}

export const checkUserRole = (userRole: UserRole, requiredUserRole: UserRole): boolean => {
    if (!userRole || !requiredUserRole) {
        return false;
    }
    const requiredRoleIndex = UserRoleAscendency.findIndex((role) => role === requiredUserRole);
    const userRoleIndex = UserRoleAscendency.findIndex((role) => role === userRole);
    return userRoleIndex >= requiredRoleIndex;
};

const defaultContextValue: IAuthContextValue = {
    officeToken: null,
    token: null,
    isLoggedIn: false,
    loginByEmail: () => undefined,
    loginExternal: () => undefined,
    loginByMicrosoft: () => undefined,
    doLoginByMicrosoft: () => undefined,
    user: undefined,
    logout: () => undefined,
    isInRole: (requiredRole: UserRole) => false,
};

// get last context value for things outside of react context, should not be used normally!!!!!!!!!
export let lastContextValue: IAuthContextValue = defaultContextValue;

export const ReactAuthContext = createContext<IAuthContextValue>(defaultContextValue);

const AuthContextProvider: FunctionComponent<{} | IAuthContextValue> = (props) => {
    // microsoftAuthService = new MicrosoftAuthService();

    const loginByEmail = async (email: string, password: string): Promise<string> => {
        // tslint:disable-next-line:no-shadowed-variable
        const { data: { loginEmail: loginByEmailQuery } }: any = await client.mutate({
            mutation: loginEmailMutation,
            variables: {
                email,
                password,
            },
        });
        const cookieHelper = new CookieHelper();
        cookieHelper.setTheme(loginByEmailQuery.theme);
        console.log(loginByEmailQuery);
        setToken(loginByEmailQuery.token);
        // await getSessionUser();
        return loginByEmailQuery.token;
    };

    const loginExternal = async (email: string, name: string, provider: AuthType, token: string): Promise<string> => {
        // tslint:disable-next-line:no-shadowed-variable
        const { data: { loginExternal: loginByExternalQuery } }: any = await client.mutate({
            mutation: loginExternalMutation,
            variables: {
                email,
                name,
                provider,
                token,
            },
        });
        const cookieHelper = new CookieHelper();
        cookieHelper.setTheme(loginByExternalQuery.theme);
        setToken(loginByExternalQuery.token);
        return loginByExternalQuery.token;
    };

    const doLoginByMicrosoft = async (): Promise<string> => {
        const microsoftAuthService = new MicrosoftAuthService();
        const acc = await microsoftAuthService.login();
        const id = acc.accountIdentifier;
        const email = acc.userName;
        const name = acc.name;
        return await loginExternal(email, name, AuthType.MICROSOFT, id);
        // const res = await microsoftAuthService.getToken();
        // if (!res) {
        //     return "";
        // }
        // return await loginByMicrosoft(res.accessToken);
    };

    const loginByMicrosoft = async (token: string): Promise<string> => {
        // tslint:disable-next-line:no-shadowed-variable
        const { data: { loginOffice: loginByOfficeQuery } }: any = await client.mutate({
            mutation: loginOfficeMutation,
            variables: {
                token,
            },
        });
        const cookieHelper = new CookieHelper();
        cookieHelper.setTheme(loginByOfficeQuery.theme);
        this.setToken(loginByOfficeQuery.token);
        // this.getSessionUser();
        return loginByOfficeQuery.token;
    };

    const logout = async () => {
        try {
            await client.mutate({
                mutation: logoutMutation,
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

    const isInRole = (requiredRole: UserRole): boolean => {
        // TODO: FIX -> User is null
        if (!isLoggedIn || !user || !user.role || !requiredRole) {
            return false;
        }
        return checkUserRole(user.role, requiredRole);
    };

    const [state, setState] = useState<IAuthContextValue>({
        ...props,
        loginByEmail,
        loginExternal,
        doLoginByMicrosoft,
        loginByMicrosoft,
        logout,
        user: defaultContextValue.user,
        officeToken: defaultContextValue.officeToken,
        token: lastToken,
        isLoggedIn: !!lastToken,
        isInRole,
    });
    const { user } = state;

    useEffect(() => {
        const token = getToken();
        if (token) {
            setToken(token);
            seeIfSessionIsValid();
        }
        // see if session is valid and update user info every 15 mins
        setInterval(seeIfSessionIsValid, 15 * 60 * 1000);
        // tslint:disable-next-line:no-empty
        return () => {
        };
    }, []);

    const getSessionUser = async (): Promise<getSession_session> => {
        const { data: { session } } = await client.query<getSession>({
            query: getSessionQuery,
        });
        // console.log(user);
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
