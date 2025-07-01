import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KommersnartPrivatePerrsonComponent } from './kommersnart-private-perrson.component';

describe('KommersnartPrivatePerrsonComponent', () => {
  let component: KommersnartPrivatePerrsonComponent;
  let fixture: ComponentFixture<KommersnartPrivatePerrsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KommersnartPrivatePerrsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KommersnartPrivatePerrsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
