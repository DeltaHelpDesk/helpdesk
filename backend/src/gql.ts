export enum AuthType {
    EMAIL = "EMAIL",
    OFFICE = "OFFICE"
}

export abstract class IMutation {
    abstract loginOffice(token: string): AuthenticatedUser | Promise<AuthenticatedUser>;

    abstract loginEmail(email: string, password: string): AuthenticatedUser | Promise<AuthenticatedUser>;

    abstract createUserEmail(email: string, password: string): User | Promise<User>;

    abstract logout(): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract session(): AuthenticatedUser | Promise<AuthenticatedUser>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Session {
    token: string;
}

export class User {
    id: number;
    fullName: string;
    email: string;
    created_at: Date;
    updated_at?: Date;
}

export type Date = any;
export type AuthenticatedUser = User | Session;
