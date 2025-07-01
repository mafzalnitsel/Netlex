import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAndAnswer1Component } from './question-and-answer1.component';

describe('QuestionAndAnswer1Component', () => {
  let component: QuestionAndAnswer1Component;
  let fixture: ComponentFixture<QuestionAndAnswer1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAndAnswer1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAndAnswer1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
