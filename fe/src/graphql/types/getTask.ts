/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { State } from "./../graphql-global-types";

// ====================================================
// GraphQL query operation: getTask
// ====================================================

export interface getTask_task_author {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface getTask_task_assignee {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface getTask_task_logs_author {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface getTask_task_logs_assignee {
  __typename: "User";
  fullName: string;
}

export interface getTask_task_logs {
  __typename: "Log";
  id: string;
  author: getTask_task_logs_author;
  created_at: any;
  comment: string | null;
  state: State | null;
  assignee: getTask_task_logs_assignee | null;
}

export interface getTask_task {
  __typename: "Task";
  id: string;
  subject: string;
  issue: string | null;
  state: State;
  created_at: any;
  author: getTask_task_author;
  assignee: getTask_task_assignee | null;
  logs: (getTask_task_logs | null)[] | null;
}

export interface getTask {
  task: getTask_task | null;
}

export interface getTaskVariables {
  id: string;
}
