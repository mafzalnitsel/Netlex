import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingTabComponent } from './accounting-tab.component';

describe('AccountingTabComponent', () => {
  let component: AccountingTabComponent;
  let fixture: ComponentFixture<AccountingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
