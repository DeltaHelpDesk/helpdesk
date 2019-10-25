declare module "react-toast-notifications" {
    import { ReactNode, ComponentType } from "react";

    export type AppearanceTypes = "error" | "info" | "success" | "warning";

    export type Placement =
        | "bottom-left"
        | "bottom-center"
        | "bottom-right"
        | "top-left"
        | "top-center"
        | "top-right";

    export type TransitionState = "entering" | "entered" | "exiting" | "exited";

    export interface IToastProps {
        appearance: AppearanceTypes;
        autoDismiss: boolean | number;
        autoDismissTimeout: number; // inherited from ToastProvider
        children: ReactNode;
        isRunning: boolean;
        onDismiss: (id?: string) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        placement: Placement;
        transitionDuration: number; // inherited from ToastProvider
        transitionState: TransitionState; // inherited from ToastProvider
    }

    export interface IToastContainerProps {
        children: ReactNode;
        hasToasts: boolean;
        placement: Placement;
    }

    export interface IToastProviderProps {
        autoDismissTimeout?: number;
        children: ReactNode;
        components?: {
            ToastContainer?: ComponentType<IToastContainerProps>;
            Toast?: ComponentType<IToastProps>;
        };
        placement?: Placement;
        transitionDuration?: number;
    }

    export interface IOptions {
        appearance: AppearanceTypes;
        autoDismiss?: boolean;
        onDismiss?: (id: string) => void;
        pauseOnHover?: boolean;
    }

    export type AddToast = (
        content: ReactNode,
        options?: IOptions,
        callback?: (id: string) => void,
    ) => void;

    export type RemoveToast = (id: string, callback: () => void) => void;

    export const DefaultToastContainer: ComponentType<IToastContainerProps>;
    export const DefaultToast: ComponentType<IToastProps>;
    export const ToastConsumer: any;
    export const ToastProvider: ComponentType<IToastProviderProps>;
    export function withToastManager(...args: any): any;
    export function useToasts(): {
        addToast: AddToast;
        removeToast: RemoveToast;
        toastStack: Array<{
            content: ReactNode;
            id: string;
            appearance: AppearanceTypes;
        }>;
    };
}
