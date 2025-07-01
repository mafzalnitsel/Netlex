import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmailFailedComponent } from './view-email-failed.component';

describe('ViewEmailFailedComponent', () => {
  let component: ViewEmailFailedComponent;
  let fixture: ComponentFixture<ViewEmailFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmailFailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmailFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
