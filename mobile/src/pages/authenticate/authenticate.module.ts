import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthenticatePage } from './authenticate';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    AuthenticatePage,
  ],
  imports: [
    IonicPageModule.forChild(AuthenticatePage),
    ComponentsModule
  ],
})
export class AuthenticatePageModule {}
