import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLawyersComponent } from './all-lawyers.component';

describe('AllLawyersComponent', () => {
  let component: AllLawyersComponent;
  let fixture: ComponentFixture<AllLawyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLawyersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
