import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskFormPage } from './task-form.page';
import { SharedModule } from "../../../shared.module";

const routes: Routes = [
  {
    path: '',
    component: TaskFormPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskFormPage]
})
export class TaskFormPageModule {
}
