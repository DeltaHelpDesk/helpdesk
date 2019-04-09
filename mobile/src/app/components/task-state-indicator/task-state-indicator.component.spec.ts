import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStateIndicatorComponent } from './task-state-indicator.component';

describe('TaskStateIndicatorComponent', () => {
  let component: TaskStateIndicatorComponent;
  let fixture: ComponentFixture<TaskStateIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskStateIndicatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStateIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
