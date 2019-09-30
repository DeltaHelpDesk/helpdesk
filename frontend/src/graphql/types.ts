export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
};

export type AuthenticatedUser = {
   __typename?: 'AuthenticatedUser',
  id: Scalars['ID'],
  fullName: Scalars['String'],
  email: Scalars['String'],
  created_at: Scalars['Date'],
  updated_at?: Maybe<Scalars['Date']>,
  token: Scalars['String'],
  role?: Maybe<UserRole>,
};

export enum AuthType {
  Email = 'EMAIL',
  Google = 'GOOGLE',
  Facebook = 'FACEBOOK',
  Microsoft = 'MICROSOFT'
}


export type Log = {
   __typename?: 'Log',
  id: Scalars['ID'],
  author: User,
  created_at: Scalars['Date'],
  comment?: Maybe<Scalars['String']>,
  state?: Maybe<State>,
  assignee?: Maybe<User>,
};

export type Mutation = {
   __typename?: 'Mutation',
  loginOffice?: Maybe<AuthenticatedUser>,
  loginEmail?: Maybe<AuthenticatedUser>,
  createUserEmail?: Maybe<User>,
  adminEditUser?: Maybe<User>,
  editUser?: Maybe<User>,
  removeUser?: Maybe<Scalars['Boolean']>,
  logout?: Maybe<Scalars['Boolean']>,
  addTask?: Maybe<Task>,
  changeTaskState?: Maybe<Task>,
  deleteTask?: Maybe<Scalars['Boolean']>,
};


export type MutationLoginOfficeArgs = {
  token: Scalars['String']
};


export type MutationLoginEmailArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationCreateUserEmailArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  fullName: Scalars['String'],
  role?: Maybe<UserRole>
};


export type MutationAdminEditUserArgs = {
  userId: Scalars['ID'],
  email?: Maybe<Scalars['String']>,
  fullName?: Maybe<Scalars['String']>,
  className?: Maybe<Scalars['String']>,
  role?: Maybe<UserRole>
};


export type MutationEditUserArgs = {
  email?: Maybe<Scalars['String']>,
  fullName?: Maybe<Scalars['String']>,
  className?: Maybe<Scalars['String']>
};


export type MutationRemoveUserArgs = {
  email: Scalars['String']
};


export type MutationAddTaskArgs = {
  subject: Scalars['String'],
  issue: Scalars['String'],
  assigneeId?: Maybe<Scalars['ID']>
};


export type MutationChangeTaskStateArgs = {
  taskId?: Maybe<Scalars['ID']>,
  comment?: Maybe<Scalars['String']>,
  state?: Maybe<State>,
  assigneeId?: Maybe<Scalars['ID']>
};


export type MutationDeleteTaskArgs = {
  taskId?: Maybe<Scalars['ID']>
};

export type Query = {
   __typename?: 'Query',
  session?: Maybe<AuthenticatedUser>,
  admins?: Maybe<Array<Maybe<User>>>,
  users?: Maybe<Array<Maybe<User>>>,
  tasks?: Maybe<Array<Maybe<Task>>>,
  task?: Maybe<Task>,
};


export type QueryTaskArgs = {
  id?: Maybe<Scalars['ID']>
};

export enum State {
  Unresolved = 'UNRESOLVED',
  Solving = 'SOLVING',
  Solved = 'SOLVED',
  Returned = 'RETURNED'
}

export type Task = {
   __typename?: 'Task',
  id: Scalars['ID'],
  subject: Scalars['String'],
  issue?: Maybe<Scalars['String']>,
  author: User,
  assignee?: Maybe<User>,
  created_at: Scalars['Date'],
  updated_at?: Maybe<Scalars['Date']>,
  state: State,
  logs?: Maybe<Array<Maybe<Log>>>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  fullName: Scalars['String'],
  email: Scalars['String'],
  created_at: Scalars['Date'],
  updated_at?: Maybe<Scalars['Date']>,
  role?: Maybe<UserRole>,
};

export enum UserRole {
  Default = 'DEFAULT',
  Admin = 'ADMIN',
  Superadmin = 'SUPERADMIN'
}
