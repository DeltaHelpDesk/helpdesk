export enum AuthType {
    EMAIL = "EMAIL",
    OFFICE = "OFFICE"
}

export enum State {
    UNRESOLVED = "UNRESOLVED",
    SOLVING = "SOLVING",
    SOLVED = "SOLVED",
    RETURNED = "RETURNED"
}

export class AuthenticatedUser {
    id: string;
    fullName: string;
    email: string;
    created_at: Date;
    updated_at?: Date;
    token: string;
}

export class Log {
    id: string;
    author: User;
    created_at: Date;
    comment?: string;
    state?: State;
    assignee?: User;
}

export abstract class IMutation {
    abstract loginOffice(token: string): AuthenticatedUser | Promise<AuthenticatedUser>;

    abstract loginEmail(email: string, password: string): AuthenticatedUser | Promise<AuthenticatedUser>;

    abstract createUserEmail(email: string, password: string, fullName: string): User | Promise<User>;

    abstract logout(): boolean | Promise<boolean>;

    abstract addTask(issue: string, assigneeId?: string): Task | Promise<Task>;

    abstract changeTaskState(taskId?: string, comment?: string, state?: State): Task | Promise<Task>;
}

export abstract class IQuery {
    abstract session(): AuthenticatedUser | Promise<AuthenticatedUser>;

    abstract tasks(): Task[] | Promise<Task[]>;

    abstract task(id?: string): Task | Promise<Task>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Task {
    id: string;
    issue: string;
    author: User;
    assignee: User;
    created_at: Date;
    updated_at?: Date;
    state: State;
    logs?: Log[];
}

export class User {
    id: string;
    fullName: string;
    email: string;
    created_at: Date;
    updated_at?: Date;
}

export type Date = any;
