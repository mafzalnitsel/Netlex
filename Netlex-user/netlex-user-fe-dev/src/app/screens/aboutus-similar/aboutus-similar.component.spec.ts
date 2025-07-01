import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusSimilarComponent } from './aboutus-similar.component';

describe('AboutusSimilarComponent', () => {
  let component: AboutusSimilarComponent;
  let fixture: ComponentFixture<AboutusSimilarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutusSimilarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusSimilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
