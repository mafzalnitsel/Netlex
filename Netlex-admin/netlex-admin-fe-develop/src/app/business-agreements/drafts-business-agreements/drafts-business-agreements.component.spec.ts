import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftsBusinessAgreementsComponent } from './drafts-business-agreements.component';

describe('DraftsBusinessAgreementsComponent', () => {
  let component: DraftsBusinessAgreementsComponent;
  let fixture: ComponentFixture<DraftsBusinessAgreementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftsBusinessAgreementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftsBusinessAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
