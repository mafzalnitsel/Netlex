import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIdComponent } from './add-id.component';

describe('AddIdComponent', () => {
  let component: AddIdComponent;
  let fixture: ComponentFixture<AddIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
