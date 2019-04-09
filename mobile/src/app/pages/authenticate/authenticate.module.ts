import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatePage } from './authenticate.page';
import { SharedModule } from "../../shared.module";


const routes: Routes = [
  {
    path: '',
    component: AuthenticatePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthenticatePage]
})
export class AuthenticatePageModule {
}
