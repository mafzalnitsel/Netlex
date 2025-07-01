import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerappComponent } from './schedulerapp.component';

describe('schedulerappComponent', () => {
  let component: SchedulerappComponent;
  let fixture: ComponentFixture<SchedulerappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
