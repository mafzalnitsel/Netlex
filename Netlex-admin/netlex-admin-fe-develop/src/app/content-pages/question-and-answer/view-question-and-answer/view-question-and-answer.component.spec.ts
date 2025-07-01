import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionAndAnswerComponent } from './view-question-and-answer.component';

describe('ViewQuestionAndAnswerComponent', () => {
  let component: ViewQuestionAndAnswerComponent;
  let fixture: ComponentFixture<ViewQuestionAndAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuestionAndAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuestionAndAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
