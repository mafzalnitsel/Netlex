import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NyttAvtalComponent } from './nytt-avtal.component';

describe('NyttAvtalComponent', () => {
  let component: NyttAvtalComponent;
  let fixture: ComponentFixture<NyttAvtalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NyttAvtalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NyttAvtalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
