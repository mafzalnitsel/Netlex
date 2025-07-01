import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyersInHomeDialogComponent } from './lawyers-in-home-dialog.component';

describe('LawyersInHomeDialogComponent', () => {
  let component: LawyersInHomeDialogComponent;
  let fixture: ComponentFixture<LawyersInHomeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyersInHomeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyersInHomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
