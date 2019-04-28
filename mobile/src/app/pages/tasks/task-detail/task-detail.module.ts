import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskDetailPage } from './task-detail.page';
import { SharedModule } from "../../../shared.module";

const routes: Routes = [
  {
    path: '',
    component: TaskDetailPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskDetailPage]
})
export class TaskDetailPageModule {
}
