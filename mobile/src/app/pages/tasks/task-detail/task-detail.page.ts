import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { TaskDetail_task } from "../../../types/types";
import { TaskService } from "../../../services/task.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {
  tasksSubscription: Subscription;
  task: TaskDetail_task | null;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tasksSubscription = this.taskService.getTask({id: params.get('id')})
        .valueChanges
        .subscribe(({data}) => {
          this.task = data.task;
        });
    });
  }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }

}
