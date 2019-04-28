import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListPage } from './task-list.page';
import { SharedModule } from "../../../shared.module";

const routes: Routes = [
  {
    path: '',
    component: TaskListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskListPage]
})

export class TaskListPageModule {
}
