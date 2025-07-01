import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateNTimeDialogComponent } from './date-n-time-dialog.component';

describe('DateNTimeDialogComponent', () => {
  let component: DateNTimeDialogComponent;
  let fixture: ComponentFixture<DateNTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateNTimeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateNTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
