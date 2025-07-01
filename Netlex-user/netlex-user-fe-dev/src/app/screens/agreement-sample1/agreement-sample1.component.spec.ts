import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementSample1Component } from './agreement-sample1.component';

describe('AgreementSample1Component', () => {
  let component: AgreementSample1Component;
  let fixture: ComponentFixture<AgreementSample1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementSample1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementSample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
