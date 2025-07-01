import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLawyerComponent } from './create-lawyer.component';

describe('CreateLawyerComponent', () => {
  let component: CreateLawyerComponent;
  let fixture: ComponentFixture<CreateLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLawyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
