import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatePage } from './authenticate.page';

describe('AuthenticatePage', () => {
  let component: AuthenticatePage;
  let fixture: ComponentFixture<AuthenticatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
