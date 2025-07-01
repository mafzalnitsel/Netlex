import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInput2Component } from './user-input2.component';

describe('UserInput2Component', () => {
  let component: UserInput2Component;
  let fixture: ComponentFixture<UserInput2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInput2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInput2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
