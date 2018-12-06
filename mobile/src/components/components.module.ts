import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import { UniversalInputErrorComponent } from './universal-input-error/universal-input-error';

@NgModule({
	declarations: [UniversalInputErrorComponent],
	imports: [CommonModule, IonicModule],
	exports: [UniversalInputErrorComponent]
})
export class ComponentsModule {}
