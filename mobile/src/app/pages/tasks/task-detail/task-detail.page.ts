import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { TaskDetail_task } from "../../../types/types";
import { TaskService } from "../../../services/task.service";
import { ActivatedRoute } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {
  tasksSubscription: Subscription;
  task: TaskDetail_task | null;

  constructor(
    private toastController: ToastController,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tasksSubscription = this.taskService.getTask({id: params.get('id')})
        .valueChanges
        .subscribe(
          ({data}) => {
          this.task = data.task;
          },
          () => this.presentToast('Nepodařilo se načíst detailu tasku'));
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }

}
