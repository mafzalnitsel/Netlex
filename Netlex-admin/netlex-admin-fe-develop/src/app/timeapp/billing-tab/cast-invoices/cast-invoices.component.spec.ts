import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastInvoicesComponent } from './cast-invoices.component';

describe('CastInvoicesComponent', () => {
  let component: CastInvoicesComponent;
  let fixture: ComponentFixture<CastInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
