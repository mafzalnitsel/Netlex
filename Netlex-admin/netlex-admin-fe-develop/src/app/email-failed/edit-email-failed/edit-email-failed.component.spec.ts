import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailFailedComponent } from './edit-email-failed.component';

describe('EditEmailFailedComponent', () => {
  let component: EditEmailFailedComponent;
  let fixture: ComponentFixture<EditEmailFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmailFailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmailFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
