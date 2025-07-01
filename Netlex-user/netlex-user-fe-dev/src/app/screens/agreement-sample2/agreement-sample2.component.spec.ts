import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementSample2Component } from './agreement-sample2.component';

describe('AgreementSample2Component', () => {
  let component: AgreementSample2Component;
  let fixture: ComponentFixture<AgreementSample2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementSample2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementSample2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
