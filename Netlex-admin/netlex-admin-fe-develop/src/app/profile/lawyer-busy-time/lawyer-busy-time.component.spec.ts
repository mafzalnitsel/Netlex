import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerBusyTimeComponent } from './lawyer-busy-time.component';

describe('LawyerBusyTimeComponent', () => {
  let component: LawyerBusyTimeComponent;
  let fixture: ComponentFixture<LawyerBusyTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyerBusyTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerBusyTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
