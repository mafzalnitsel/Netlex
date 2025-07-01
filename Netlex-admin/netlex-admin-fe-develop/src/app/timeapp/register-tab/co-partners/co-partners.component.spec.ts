import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoPartnersComponent } from './co-partners.component';

describe('CoPartnersComponent', () => {
  let component: CoPartnersComponent;
  let fixture: ComponentFixture<CoPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
