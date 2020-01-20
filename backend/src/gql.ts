
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum AuthType {
    EMAIL = "EMAIL",
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK",
    MICROSOFT = "MICROSOFT",
    GITHUB = "GITHUB"
}

export enum State {
    UNRESOLVED = "UNRESOLVED",
    SOLVING = "SOLVING",
    SOLVED = "SOLVED",
    RETURNED = "RETURNED"
}

export enum UserRole {
    DEFAULT = "DEFAULT",
    ADMIN = "ADMIN",
    SUPERADMIN = "SUPERADMIN"
}

export class AuthenticatedUser {
    id: string;
    fullName: string;
    email: string;
    language: string;
    theme?: string;
    created_at: Date;
    updated_at?: Date;
    token: string;
    role?: UserRole;
}

export class ClientConfig {
    validation: Validation;
    preferencies: Preferencies;
}

export class Comment {
    id: string;
    author: User;
    created_at: Date;
    updated_at: Date;
    message: string;
}

export abstract class IMutation {
    abstract loginOffice(token: string): AuthenticatedUser | Promise<AuthenticatedUser>;

    abstract loginExternal(email: string, name: string, provider: AuthType, token: string): AuthenticatedUser | Promise<AuthenticatedUser>;

    abstract loginEmail(email: string, password: string): AuthenticatedUser | Promise<AuthenticatedUser>;

    abstract createUserEmail(email: string, password: string, fullName: string, role?: UserRole): User | Promise<User>;

    abstract adminEditUser(userId: string, email?: string, fullName?: string, className?: string, role?: UserRole): User | Promise<User>;

    abstract editUser(email?: string, fullName?: string, className?: string, language?: string, theme?: string): User | Promise<User>;

    abstract removeUser(email: string): boolean | Promise<boolean>;

    abstract logout(): boolean | Promise<boolean>;

    abstract addTask(subject: string, issue: string, assigneeId?: string): Task | Promise<Task>;

    abstract changeTaskState(taskId?: string, comment?: string, state?: State, assigneeId?: string): Task | Promise<Task>;

    abstract deleteTask(taskId?: string): boolean | Promise<boolean>;

    abstract addSubTask(taskId: string, message: string): SubTask | Promise<SubTask>;

    abstract changeSubTask(subTaskId: string, message?: string, completed?: boolean): SubTask | Promise<SubTask>;

    abstract deleteSubTask(subTaskId: string): boolean | Promise<boolean>;

    abstract addComment(taskId: string, message: string): Comment | Promise<Comment>;

    abstract changeComment(commentId: string, message?: string): Comment | Promise<Comment>;

    abstract deleteComment(subTaskId: string): boolean | Promise<boolean>;
}

export class Preferencies {
    language: string;
    theme: string;
}

export abstract class IQuery {
    abstract session(): AuthenticatedUser | Promise<AuthenticatedUser>;

    abstract admins(): User[] | Promise<User[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract clientConfig(): ClientConfig | Promise<ClientConfig>;

    abstract tasks(): Task[] | Promise<Task[]>;

    abstract task(id?: string): Task | Promise<Task>;
}

export class SubTask {
    id: string;
    message: string;
    completed?: boolean;
    completed_at?: Date;
    task: Task;
    created_at: Date;
}

export class Task {
    id: string;
    subject: string;
    issue: string;
    author: User;
    assignee?: User;
    created_at: Date;
    updated_at?: Date;
    state: State;
    subtasks?: SubTask[];
    comments?: Comment[];
}

export class User {
    id: string;
    fullName: string;
    email: string;
    created_at: Date;
    updated_at?: Date;
    role?: UserRole;
    enabled: boolean;
}

export class Validation {
    taskSubjectMaxLength: number;
    taskIssueMaxLength: number;
    subtaskMaxLength: number;
    commentMaxLength: number;
}
