import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeConfigurationComponent } from './stripe-configuration.component';

describe('StripeConfigurationComponent', () => {
  let component: StripeConfigurationComponent;
  let fixture: ComponentFixture<StripeConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripeConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
