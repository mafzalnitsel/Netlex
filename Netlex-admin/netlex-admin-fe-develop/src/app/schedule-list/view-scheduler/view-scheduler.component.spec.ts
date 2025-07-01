import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSchedulerComponent } from './view-scheduler.component';

describe('ViewSchedulerComponent', () => {
  let component: ViewSchedulerComponent;
  let fixture: ComponentFixture<ViewSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
