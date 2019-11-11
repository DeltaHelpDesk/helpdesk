import { UserRole, ReactAuthContext, checkUserRole } from "../graphql/auth";
import Router from "next/router";
import customRoutes from "../Routes";
import { useContext, useEffect } from "react";

export const withAuthSync = (WrappedComponent: any, minRole: UserRole = UserRole.DEFAULT) => {

    const Wrapper = (props: any) => {
        const syncLogout = (event: { key: string; }) => {
            if (event.key === "logout") {
                console.log("logged out from storage!");
                Router.push(customRoutes.loginRoute);
            }
        };

        const showError = (text: string) => {
            console.log(text);
        };

        const { isLoggedIn, user } = useContext(ReactAuthContext);

        useEffect(() => {
            window.addEventListener("storage", syncLogout);
            if (!isLoggedIn) {
                showError("Musíte se přihásit");
                Router.push(customRoutes.loginRoute);
                return;
            }

            if (user && !checkUserRole(user.role, minRole)) {
                showError("Nemáte dostatečné oprávnění");
                console.log("Nemáte dostatečné oprávnění");
                Router.back();
                return;
            }

            return () => {
                window.removeEventListener("storage", syncLogout);
                window.localStorage.removeItem("logout");
            };
        }, [null]);

        return isLoggedIn && <WrappedComponent {...props} />;
    };

    Wrapper.getInitialProps = async (ctx: any) => {
        // console.log(ctx);
        const token = ""; // ctx.token;

        const componentProps =
            WrappedComponent.getInitialProps &&
            (await WrappedComponent.getInitialProps(ctx));

        return { ...componentProps, token };
    };

    return Wrapper;
};
