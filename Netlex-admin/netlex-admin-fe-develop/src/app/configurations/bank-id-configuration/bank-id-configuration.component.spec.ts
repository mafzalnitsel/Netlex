import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankIdConfigurationComponent } from './bank-id-configuration.component';

describe('BankIdConfigurationComponent', () => {
  let component: BankIdConfigurationComponent;
  let fixture: ComponentFixture<BankIdConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankIdConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankIdConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
