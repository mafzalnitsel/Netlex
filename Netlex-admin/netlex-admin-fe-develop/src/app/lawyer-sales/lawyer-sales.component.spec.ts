import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerSalesComponent } from './lawyer-sales.component';

describe('LawyerSalesComponent', () => {
  let component: LawyerSalesComponent;
  let fixture: ComponentFixture<LawyerSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyerSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
