/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { State } from "./../graphql-global-types";

// ====================================================
// GraphQL mutation operation: changeTaskBoardState
// ====================================================

export interface changeTaskBoardState_changeTaskState_author {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface changeTaskBoardState_changeTaskState_assignee {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface changeTaskBoardState_changeTaskState {
  __typename: "Task";
  id: string;
  subject: string;
  issue: string | null;
  author: changeTaskBoardState_changeTaskState_author;
  assignee: changeTaskBoardState_changeTaskState_assignee | null;
  created_at: any;
  updated_at: any | null;
  state: State;
}

export interface changeTaskBoardState {
  changeTaskState: changeTaskBoardState_changeTaskState | null;
}

export interface changeTaskBoardStateVariables {
  taskId: string;
  comment: string;
  state: State;
}
