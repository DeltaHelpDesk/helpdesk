export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface IScalars {
    ID: string,
    String: string,
    Boolean: boolean,
    Int: number,
    Float: number,
    Date: any,
};

export interface IAuthenticatedUser {
    __typename?: 'AuthenticatedUser',
    id: IScalars['ID'],
    fullName: IScalars['String'],
    email: IScalars['String'],
    created_at: IScalars['Date'],
    updated_at?: Maybe<IScalars['Date']>,
    token: IScalars['String'],
    role?: Maybe<UserRole>,
};

export enum AuthType {
    Email = 'EMAIL',
    Google = 'GOOGLE',
    Facebook = 'FACEBOOK',
    Microsoft = 'MICROSOFT',
    Github = 'GITHUB'
}


export interface ILog {
    __typename?: 'Log',
    id: IScalars['ID'],
    author: IUser,
    created_at: IScalars['Date'],
    comment?: Maybe<IScalars['String']>,
    state?: Maybe<State>,
    assignee?: Maybe<IUser>,
};

export interface IMutation {
    __typename?: 'Mutation',
    loginOffice?: Maybe<IAuthenticatedUser>,
    LoginExternal?: Maybe<IAuthenticatedUser>,
    loginEmail?: Maybe<IAuthenticatedUser>,
    createUserEmail?: Maybe<IUser>,
    adminEditUser?: Maybe<IUser>,
    editUser?: Maybe<IUser>,
    removeUser?: Maybe<IScalars['Boolean']>,
    logout?: Maybe<IScalars['Boolean']>,
    addTask?: Maybe<ITask>,
    changeTaskState?: Maybe<ITask>,
    deleteTask?: Maybe<IScalars['Boolean']>,
};


export interface IMutationLoginOfficeArgs {
    token: IScalars['String']
};


export interface IMutationLoginEmailArgs {
    email: IScalars['String'],
    password: IScalars['String']
};


export interface IMutationLoginExternalArgs {
    email: IScalars['String'],
    name: IScalars['String'],
    provider: AuthType,
    token: IScalars['String'],
};


export interface IMutationCreateUserEmailArgs {
    email: IScalars['String'],
    password: IScalars['String'],
    fullName: IScalars['String'],
    role?: Maybe<UserRole>
};


export interface IMutationAdminEditUserArgs {
    userId: IScalars['ID'],
    email?: Maybe<IScalars['String']>,
    fullName?: Maybe<IScalars['String']>,
    className?: Maybe<IScalars['String']>,
    role?: Maybe<UserRole>
};


export interface IMutationEditUserArgs {
    email?: Maybe<IScalars['String']>,
    fullName?: Maybe<IScalars['String']>,
    className?: Maybe<IScalars['String']>
};


export interface IMutationRemoveUserArgs {
    email: IScalars['String']
};


export interface IMutationAddTaskArgs {
    subject: IScalars['String'],
    issue: IScalars['String'],
    assigneeId?: Maybe<IScalars['ID']>
};


export interface IMutationChangeTaskStateArgs {
    taskId?: Maybe<IScalars['ID']>,
    comment?: Maybe<IScalars['String']>,
    state?: Maybe<State>,
    assigneeId?: Maybe<IScalars['ID']>
};


export interface IMutationDeleteTaskArgs {
    taskId?: Maybe<IScalars['ID']>
};

export interface IQuery {
    __typename?: 'Query',
    session?: Maybe<IAuthenticatedUser>,
    admins?: Maybe<Array<Maybe<IUser>>>,
    users?: Maybe<Array<Maybe<IUser>>>,
    tasks?: Maybe<Array<Maybe<ITask>>>,
    task?: Maybe<ITask>,
};


export interface IQueryTaskArgs {
    id?: Maybe<IScalars['ID']>
};

export enum State {
    Unresolved = 'UNRESOLVED',
    Solving = 'SOLVING',
    Solved = 'SOLVED',
    Returned = 'RETURNED'
}

export interface ITask {
    __typename?: 'Task',
    id: IScalars['ID'],
    subject: IScalars['String'],
    issue?: Maybe<IScalars['String']>,
    author: IUser,
    assignee?: Maybe<IUser>,
    created_at: IScalars['Date'],
    updated_at?: Maybe<IScalars['Date']>,
    state: State,
    logs?: Maybe<Array<Maybe<ILog>>>,
};

export interface IUser {
    __typename?: 'User',
    id: IScalars['ID'],
    fullName: IScalars['String'],
    email: IScalars['String'],
    created_at: IScalars['Date'],
    updated_at?: Maybe<IScalars['Date']>,
    role?: Maybe<UserRole>,
};

export enum UserRole {
    Default = 'DEFAULT',
    Admin = 'ADMIN',
    Superadmin = 'SUPERADMIN'
}
