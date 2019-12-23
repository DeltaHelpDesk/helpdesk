/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../graphql-global-types";

// ====================================================
// GraphQL query operation: GetTaskComments
// ====================================================

export interface GetTaskComments_task_comments_author {
  __typename: "User";
  fullName: string;
  role: UserRole | null;
}

export interface GetTaskComments_task_comments {
  __typename: "Comment";
  author: GetTaskComments_task_comments_author;
  created_at: any;
  updated_at: any;
  message: string;
}

export interface GetTaskComments_task {
  __typename: "Task";
  comments: (GetTaskComments_task_comments | null)[] | null;
}

export interface GetTaskComments {
  task: GetTaskComments_task | null;
}

export interface GetTaskCommentsVariables {
  id: string;
}
