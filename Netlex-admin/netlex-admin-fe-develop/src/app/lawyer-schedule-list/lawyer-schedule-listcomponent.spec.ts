import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerScheduleListComponent } from './lawyer-schedule-list.component';

describe('LawyerScheduleListComponent', () => {
  let component: LawyerScheduleListComponent;
  let fixture: ComponentFixture<LawyerScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyerScheduleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
