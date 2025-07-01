import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseAgreementRequestsComponent } from './purchase-agreement-requests.component';

describe('PurchaseAgreementRequestsComponent', () => {
  let component: PurchaseAgreementRequestsComponent;
  let fixture: ComponentFixture<PurchaseAgreementRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseAgreementRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseAgreementRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
