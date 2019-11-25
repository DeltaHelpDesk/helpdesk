/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { State } from "./../graphql-global-types";

// ====================================================
// GraphQL query operation: getTasks
// ====================================================

export interface getTasks_tasks_author {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface getTasks_tasks_assignee {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface getTasks_tasks {
  __typename: "Task";
  id: string;
  subject: string;
  issue: string | null;
  state: State;
  created_at: any;
  author: getTasks_tasks_author;
  assignee: getTasks_tasks_assignee | null;
}

export interface getTasks {
  tasks: (getTasks_tasks | null)[] | null;
}
