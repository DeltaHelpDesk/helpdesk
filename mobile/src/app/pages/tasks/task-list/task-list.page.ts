import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../../services/task.service";
import { Subscription } from "rxjs";
import { TaskList_tasks } from "../../../types/types";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  tasksSubscription: Subscription;
  tasks: (TaskList_tasks | null)[] | null;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasksSubscription = this.taskService.getTasks()
      .valueChanges
      .subscribe(({ data }) => {
        this.tasks = data.tasks;
        console.log(this.tasks)
      });
  }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }
}
