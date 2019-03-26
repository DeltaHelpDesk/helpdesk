/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EmailAuth
// ====================================================

export interface EmailAuth_loginEmail {
  __typename: "AuthenticatedUser";
  id: string;
  fullName: string;
  token: string;
}

export interface EmailAuth {
  loginEmail: EmailAuth_loginEmail | null;
}

export interface EmailAuthVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TaskList
// ====================================================

export interface TaskList_tasks_author {
  __typename: "User";
  fullName: string;
}

export interface TaskList_tasks_assignee {
  __typename: "User";
  fullName: string;
}

export interface TaskList_tasks {
  __typename: "Task";
  id: string;
  subject: string;
  author: TaskList_tasks_author;
  assignee: TaskList_tasks_assignee;
  state: State;
}

export interface TaskList {
  tasks: (TaskList_tasks | null)[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TaskDetail
// ====================================================

export interface TaskDetail_task_author {
  __typename: "User";
  fullName: string;
}

export interface TaskDetail_task_assignee {
  __typename: "User";
  fullName: string;
}

export interface TaskDetail_task {
  __typename: "Task";
  id: string;
  subject: string;
  author: TaskDetail_task_author;
  assignee: TaskDetail_task_assignee;
  state: State;
  issue: string;
  created_at: any;
}

export interface TaskDetail {
  task: TaskDetail_task | null;
}

export interface TaskDetailVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum State {
  RETURNED = "RETURNED",
  SOLVED = "SOLVED",
  SOLVING = "SOLVING",
  UNRESOLVED = "UNRESOLVED",
}

//==============================================================
// END Enums and Input Objects
//==============================================================