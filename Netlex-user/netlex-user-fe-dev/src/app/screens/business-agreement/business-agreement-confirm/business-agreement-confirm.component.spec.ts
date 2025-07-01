import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAgreementConfirmComponent } from './business-agreement-confirm.component';

describe('BusinessAgreementConfirmComponent', () => {
  let component: BusinessAgreementConfirmComponent;
  let fixture: ComponentFixture<BusinessAgreementConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAgreementConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAgreementConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
