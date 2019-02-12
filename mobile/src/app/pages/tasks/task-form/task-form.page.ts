import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage {

  form = this.fb.group({
    subject: ['', Validators.required],
    issue: ['', Validators.required],
    // TODO: Device?
  });

  constructor(private fb: FormBuilder) { }

}
