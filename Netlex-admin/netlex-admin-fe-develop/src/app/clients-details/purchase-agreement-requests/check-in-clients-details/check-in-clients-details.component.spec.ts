import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInClientsDetailsComponent } from './check-in-clients-details.component';

describe('CheckInClientsDetailsComponent', () => {
  let component: CheckInClientsDetailsComponent;
  let fixture: ComponentFixture<CheckInClientsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInClientsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInClientsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
