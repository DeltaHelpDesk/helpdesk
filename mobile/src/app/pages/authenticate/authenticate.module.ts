import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsModule} from './../../components/components.module';

import {IonicModule} from '@ionic/angular';

import {AuthenticatePage} from './authenticate.page';


const routes: Routes = [
  {
    path: '',
    component: AuthenticatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [AuthenticatePage]
})
export class AuthenticatePageModule {
}
