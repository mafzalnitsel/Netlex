import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInput4Component } from './user-input4.component';

describe('UserInput4Component', () => {
  let component: UserInput4Component;
  let fixture: ComponentFixture<UserInput4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInput4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInput4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
