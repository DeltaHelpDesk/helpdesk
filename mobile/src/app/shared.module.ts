import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "./components/components.module";

@NgModule({
  exports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
  ]
})
export class SharedModule {
}
