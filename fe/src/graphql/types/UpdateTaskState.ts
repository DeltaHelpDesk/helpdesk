/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { State } from "./../graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateTaskState
// ====================================================

export interface UpdateTaskState_changeTaskState {
  __typename: "Task";
  id: string;
}

export interface UpdateTaskState {
  changeTaskState: UpdateTaskState_changeTaskState | null;
}

export interface UpdateTaskStateVariables {
  taskId: string;
  state: State;
}
