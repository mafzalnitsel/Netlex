import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAboutUsComponent } from './create-about-us.component';

describe('CreateAboutUsComponent', () => {
  let component: CreateAboutUsComponent;
  let fixture: ComponentFixture<CreateAboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAboutUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
