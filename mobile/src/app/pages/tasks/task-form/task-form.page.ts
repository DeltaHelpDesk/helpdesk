import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { markFormGroupTouched } from "../../../helpers/form.helper";
import { AdminList_admins } from "../../../types/types";
import { AdminsService } from "../../../services/admins.service";
import { Subscription } from "rxjs";
import { NavController, ToastController } from "@ionic/angular";
import { TaskService } from "../../../services/task.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage {
  adminsSubscription: Subscription;
  admins: (AdminList_admins | null)[] | null;

  form = this.fb.group({
    subject: ['', Validators.required],
    issue: ['', Validators.required],
    assigneeId: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
    private toastController: ToastController,
    private adminsService: AdminsService,
    private taskService: TaskService
  ) {
  }

  ngOnInit() {
    this.adminsSubscription = this.adminsService.getAdminList()
      .valueChanges
      .subscribe(
        ({data}) => {
          this.admins = data.admins;
          console.log(this.admins)
        },
        () => this.presentToast('Nepodařilo se načíst seznam administrátorů'));
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

  submitForm() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }

    this.taskService.addTask(this.form.value)
      .subscribe(
        ({data}) => {
          this.presentToast('Task byl úspěšně vytvořen');
          this.navCtrl.navigateRoot(`/tasks/${data.addTask.id}`);
        },
        () => this.presentToast('Task nebylo možné vytvořit')
      );
  }

  ngOnDestroy() {
    this.adminsSubscription.unsubscribe();
  }
}
