import { Component, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'universal-input-error',
  templateUrl: 'universal-input-error.html'
})
export class UniversalInputErrorComponent {
  @Input() control: FormControl;
}
