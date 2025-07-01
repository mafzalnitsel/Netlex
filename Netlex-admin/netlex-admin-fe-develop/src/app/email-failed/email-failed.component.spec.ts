import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFailedComponent } from './email-failed.component';

describe('EmailFailedComponent', () => {
  let component: EmailFailedComponent;
  let fixture: ComponentFixture<EmailFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailFailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
