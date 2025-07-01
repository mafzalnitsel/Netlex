import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProgressLoadingComponent } from './register-progress-loading.component';

describe('RegisterProgressLoadingComponent', () => {
  let component: RegisterProgressLoadingComponent;
  let fixture: ComponentFixture<RegisterProgressLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProgressLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProgressLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
