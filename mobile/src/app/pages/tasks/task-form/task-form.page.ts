import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { markFormGroupTouched } from "../../../helpers/form.helper";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage {
  admins: any[];

  form = this.fb.group({
    subject: ['', Validators.required],
    issue: ['', Validators.required],
    assigneeId: [null]
  });

  constructor(private fb: FormBuilder) {
  }

  submitForm() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }

  }

}
