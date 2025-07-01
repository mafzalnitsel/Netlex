import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionAndAnswerComponent } from './create-question-and-answer.component';

describe('CreateQuestionAndAnswerComponent', () => {
  let component: CreateQuestionAndAnswerComponent;
  let fixture: ComponentFixture<CreateQuestionAndAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQuestionAndAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuestionAndAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
