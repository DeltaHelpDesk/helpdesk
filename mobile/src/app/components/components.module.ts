import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlErrorComponent } from './form-control-error/form-control-error.component';
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [FormControlErrorComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FormControlErrorComponent
  ],
})
export class ComponentsModule { 

}


