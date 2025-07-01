import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavskontrollQuestionsDialogComponent } from './javskontroll-questions-dialog.component';

describe('JavskontrollQuestionsDialogComponent', () => {
  let component: JavskontrollQuestionsDialogComponent;
  let fixture: ComponentFixture<JavskontrollQuestionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavskontrollQuestionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavskontrollQuestionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
