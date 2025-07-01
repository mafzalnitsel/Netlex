import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterPartiesComponent } from './counter-parties.component';

describe('CounterPartiesComponent', () => {
  let component: CounterPartiesComponent;
  let fixture: ComponentFixture<CounterPartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterPartiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
