import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authenticate',
    pathMatch: 'full'
  },
  { path: 'authenticate', loadChildren: './pages/authenticate/authenticate.module#AuthenticatePageModule' },
  // { path: 'tasks/create', loadChildren: './tasks/task-form/task-form.module#TaskFormPageModule' },
  // { path: 'tasks/:id/edit', loadChildren: './tasks/task-form/task-form.module#TaskFormPageModule' },
  // { path: 'tasks/:id', loadChildren: './tasks/task-detail/task-detail.module#TaskDetailPageModule' },
  // { path: 'tasks', loadChildren: './tasks/task-list/task-list.module#TaskListPageModule' },
  // { path: 'devices', loadChildren: './device-list/device-list.module#DeviceListPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
