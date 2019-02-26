import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { TaskDetailQuery, TaskListQuery } from "../queries/task.query";
import { TaskDetail, TaskDetailVariables, TaskList } from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private apollo: Apollo) {
  }

  public getTasks() {
    return this.apollo.watchQuery<TaskList>({
      query: TaskListQuery,
    })
  }

  public getTask(variables: TaskDetailVariables | any) {
    return this.apollo.watchQuery<TaskDetail>({
      query: TaskDetailQuery,
      variables: variables
    })
  }
}
