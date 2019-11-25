/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { State } from "./../graphql-global-types";

// ====================================================
// GraphQL mutation operation: changeTaskState
// ====================================================

export interface changeTaskState_changeTaskState {
  __typename: "Task";
  id: string;
}

export interface changeTaskState {
  changeTaskState: changeTaskState_changeTaskState | null;
}

export interface changeTaskStateVariables {
  taskId?: string | null;
  comment?: string | null;
  state?: State | null;
  assigneeId?: string | null;
}
