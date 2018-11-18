export abstract class IMutation {
    abstract loginEmail(email: string, password: string): User | Promise<User>;

    abstract createEmailUser(email: string, password: string): User | Promise<User>;

    abstract logout(): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract session(): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    id: number;
    fullName: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
}

export type Date = any;
