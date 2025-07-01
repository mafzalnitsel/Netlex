import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInput3Component } from './user-input3.component';

describe('UserInput3Component', () => {
  let component: UserInput3Component;
  let fixture: ComponentFixture<UserInput3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInput3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInput3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
