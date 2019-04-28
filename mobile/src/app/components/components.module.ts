import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlErrorComponent } from './form-control-error/form-control-error.component';
import { IonicModule } from "@ionic/angular";
import { TaskStateIndicatorComponent } from './task-state-indicator/task-state-indicator.component';

@NgModule({
  declarations: [
    FormControlErrorComponent,
    TaskStateIndicatorComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FormControlErrorComponent,
    TaskStateIndicatorComponent
  ],
})
export class ComponentsModule {

}


