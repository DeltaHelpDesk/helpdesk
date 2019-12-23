/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole, State } from "./../graphql-global-types";

// ====================================================
// GraphQL query operation: GetTaskDetail
// ====================================================

export interface GetTaskDetail_task_author {
  __typename: "User";
  fullName: string;
  role: UserRole | null;
}

export interface GetTaskDetail_task_comments_author {
  __typename: "User";
  fullName: string;
  role: UserRole | null;
}

export interface GetTaskDetail_task_comments {
  __typename: "Comment";
  author: GetTaskDetail_task_comments_author;
  created_at: any;
  updated_at: any;
  message: string;
}

export interface GetTaskDetail_task {
  __typename: "Task";
  subject: string;
  issue: string;
  author: GetTaskDetail_task_author;
  created_at: any;
  updated_at: any | null;
  state: State;
  comments: (GetTaskDetail_task_comments | null)[] | null;
}

export interface GetTaskDetail {
  task: GetTaskDetail_task | null;
}

export interface GetTaskDetailVariables {
  id: string;
}
