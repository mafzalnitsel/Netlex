import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementQuestionsDialogComponent } from './agreement-questions-dialog.component';

describe('AgreementQuestionsDialogComponent', () => {
  let component: AgreementQuestionsDialogComponent;
  let fixture: ComponentFixture<AgreementQuestionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementQuestionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementQuestionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
