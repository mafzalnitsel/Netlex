import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sample3Component } from './sample3.component';

describe('Sample3Component', () => {
  let component: Sample3Component;
  let fixture: ComponentFixture<Sample3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sample3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sample3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
