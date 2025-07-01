import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementConfirmComponent } from './agreement-confirm.component';

describe('AgreementConfirmComponent', () => {
  let component: AgreementConfirmComponent;
  let fixture: ComponentFixture<AgreementConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
