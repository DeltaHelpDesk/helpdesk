import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedOnlyGuard } from "./guards/authenticated-only.guard";
import { NotAuthenticatedOnlyGuard } from "./guards/not-authenticated-only.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authenticate',
    pathMatch: 'full'
  },
  {
    path: 'authenticate',
    canActivate: [NotAuthenticatedOnlyGuard],
    loadChildren: './pages/authenticate/authenticate.module#AuthenticatePageModule'
  },
  {
    path: 'tasks/create',
    canActivate: [AuthenticatedOnlyGuard],
    loadChildren: './pages/tasks/task-form/task-form.module#TaskFormPageModule'
  },
  {
    path: 'tasks',
    canActivate: [AuthenticatedOnlyGuard],
    loadChildren: './pages/tasks/task-list/task-list.module#TaskListPageModule'
  },
  {
    path: 'tasks/:id',
    canActivate: [AuthenticatedOnlyGuard],
    loadChildren: './pages/tasks/task-detail/task-detail.module#TaskDetailPageModule'
  },
  {path: 'about', loadChildren: './pages/about/about.module#AboutPageModule'},
  // { path: 'tasks/:id/edit', loadChildren: './tasks/task-form/task-form.module#TaskFormPageModule' },
  // { path: 'tasks/:id', loadChildren: './tasks/task-detail/task-detail.module#TaskDetailPageModule' },
  // { path: 'devices', loadChildren: './device-list/device-list.module#DeviceListPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
