import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyersDialogComponent } from './lawyers-dialog.component';

describe('LawyersDialogComponent', () => {
  let component: LawyersDialogComponent;
  let fixture: ComponentFixture<LawyersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
