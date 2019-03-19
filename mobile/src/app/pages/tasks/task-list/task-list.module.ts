import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TaskListPage } from './task-list.page';
import { ComponentsModule } from "../../../components/components.module";

const routes: Routes = [
  {
    path: '',
    component: TaskListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [TaskListPage]
})
export class TaskListPageModule {
}
