import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskCreatePage } from './task-create';

@NgModule({
  declarations: [
    TaskCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TaskCreatePage),
  ],
})
export class TaskCreatePageModule {}
