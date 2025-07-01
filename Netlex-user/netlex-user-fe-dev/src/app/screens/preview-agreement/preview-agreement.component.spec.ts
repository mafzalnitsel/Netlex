import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAgreementComponent } from './preview-agreement.component';

describe('PreviewAgreementComponent', () => {
  let component: PreviewAgreementComponent;
  let fixture: ComponentFixture<PreviewAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
