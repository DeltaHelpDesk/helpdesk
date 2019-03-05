import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../../services/task.service";
import { Subscription } from "rxjs";
import { TaskList_tasks } from "../../../types/types";
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  tasksSubscription: Subscription;
  tasks: (TaskList_tasks | null)[] | null;

  constructor(
    private toastController: ToastController,
    private taskService: TaskService
  ) {
  }

  ngOnInit() {
    this.tasksSubscription = this.taskService.getTasks()
      .valueChanges
      .subscribe(
        ({data}) => {
          this.tasks = data.tasks;
          console.log(this.tasks)
        },
        () => this.presentToast('Nepodařilo se načíst seznam tasků'));
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
