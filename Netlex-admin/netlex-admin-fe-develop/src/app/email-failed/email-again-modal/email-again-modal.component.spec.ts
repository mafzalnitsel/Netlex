import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAgainModalComponent } from './email-again-modal.component';

describe('EmailAgainModalComponent', () => {
  let component: EmailAgainModalComponent;
  let fixture: ComponentFixture<EmailAgainModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailAgainModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailAgainModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
