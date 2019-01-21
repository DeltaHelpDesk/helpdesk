import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authenticate',
    pathMatch: 'full'
  },
  { path: 'authenticate', loadChildren: './authenticate/authenticate.module#AuthenticatePageModule' },
  { path: 'tasks/create', loadChildren: './task/task-create/task-create.module#TaskCreatePageModule' },
  { path: 'tasks/:id', loadChildren: './task/task-detail/task-detail.module#TaskDetailPageModule' },
  { path: 'tasks', loadChildren: './task/task-list/task-list.module#TaskListPageModule' },
  { path: 'devices', loadChildren: './device-list/device-list.module#DeviceListPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
