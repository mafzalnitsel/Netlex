import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOld1Component } from './home-old1.component';

describe('HomeOld1Component', () => {
  let component: HomeOld1Component;
  let fixture: ComponentFixture<HomeOld1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeOld1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOld1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
