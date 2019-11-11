declare module "react-social-login" {
    export type ISocialLoginProvider = "amazon" | "facebook" | "github" | "google" | "instagram" | "linkedin";

    interface ISocialLoginProps {
        appId: string;
        autoCleanUri?: boolean;
        autoLogin?: boolean;
        gatekeeper?: string;
        getInstance?: () => React.RefObject<any>;
        onLoginFailure: (result: any) => void;
        onLoginSuccess: (result: any) => void;
        onLogoutFailure?: (result: any) => void;
        onLogoutSuccess?: (result: any) => void;
        provider: ISocialLoginProvider;
        className?: string;
        redirect?: string;
        scope?: [] | string;
        [key: string]: any;
    }

    export default function SocialLogin(
        WrappedComponent: React.ComponentType<any>,
    ): React.ComponentType<ISocialLoginProps>;
}
