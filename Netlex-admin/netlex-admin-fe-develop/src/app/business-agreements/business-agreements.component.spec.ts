import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAgreementsComponent } from './business-agreements.component';

describe('BusinessAgreementsComponent', () => {
  let component: BusinessAgreementsComponent;
  let fixture: ComponentFixture<BusinessAgreementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAgreementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
