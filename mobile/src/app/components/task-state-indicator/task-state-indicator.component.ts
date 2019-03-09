import { Component, Input } from '@angular/core';

@Component({
  selector: 'task-state-indicator',
  templateUrl: './task-state-indicator.component.html',
  styleUrls: ['./task-state-indicator.component.scss']
})
export class TaskStateIndicatorComponent {
  @Input() state: string;
}
