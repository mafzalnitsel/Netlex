import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityAreasComponent } from './activity-areas.component';

describe('ActivityAreasComponent', () => {
  let component: ActivityAreasComponent;
  let fixture: ComponentFixture<ActivityAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
