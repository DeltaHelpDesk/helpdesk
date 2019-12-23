/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { State } from "./../graphql-global-types";

// ====================================================
// GraphQL mutation operation: addTask
// ====================================================

export interface addTask_addTask_author {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface addTask_addTask_assignee {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface addTask_addTask {
  __typename: "Task";
  id: string;
  issue: string;
  state: State;
  author: addTask_addTask_author;
  assignee: addTask_addTask_assignee | null;
}

export interface addTask {
  addTask: addTask_addTask | null;
}

export interface addTaskVariables {
  subject: string;
  issue: string;
  assigneeId?: string | null;
}
