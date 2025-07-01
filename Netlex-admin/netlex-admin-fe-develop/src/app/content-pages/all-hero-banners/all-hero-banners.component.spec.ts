import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHeroBannersComponent } from './all-hero-banners.component';

describe('AllHeroBannersComponent', () => {
  let component: AllHeroBannersComponent;
  let fixture: ComponentFixture<AllHeroBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllHeroBannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHeroBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
