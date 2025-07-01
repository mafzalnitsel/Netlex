import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedularOldComponent } from './schedular-old.component';

describe('SchedularOldComponent', () => {
  let component: SchedularOldComponent;
  let fixture: ComponentFixture<SchedularOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedularOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedularOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
