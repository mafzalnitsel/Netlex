import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLawyerSchedulerComponent } from './view-lawyer-scheduler.component';

describe('ViewLawyerSchedulerComponent', () => {
  let component: ViewLawyerSchedulerComponent;
  let fixture: ComponentFixture<ViewLawyerSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLawyerSchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLawyerSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
