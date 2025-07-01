import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyersInHomeComponent } from './lawyers-in-home.component';

describe('LawyersInHomeComponent', () => {
  let component: LawyersInHomeComponent;
  let fixture: ComponentFixture<LawyersInHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyersInHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyersInHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
