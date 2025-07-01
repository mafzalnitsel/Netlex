import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLawyerSchedulerComponent } from './create-lawyer-scheduler.component';

describe('CreateLawyerSchedulerComponent', () => {
  let component: CreateLawyerSchedulerComponent;
  let fixture: ComponentFixture<CreateLawyerSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLawyerSchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLawyerSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
