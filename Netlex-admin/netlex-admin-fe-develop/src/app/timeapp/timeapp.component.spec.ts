import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeappComponent } from './timeapp.component';

describe('TimeappComponent', () => {
  let component: TimeappComponent;
  let fixture: ComponentFixture<TimeappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
