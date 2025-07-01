import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingIdComponent } from './existing-id.component';

describe('ExistingIdComponent', () => {
  let component: ExistingIdComponent;
  let fixture: ComponentFixture<ExistingIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
