import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KommersnartComponent } from './kommersnart.component';

describe('KommersnartComponent', () => {
  let component: KommersnartComponent;
  let fixture: ComponentFixture<KommersnartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KommersnartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KommersnartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
