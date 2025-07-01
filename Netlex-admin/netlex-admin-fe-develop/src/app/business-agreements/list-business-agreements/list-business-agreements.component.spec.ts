import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBusinessAgreementsComponent } from './list-business-agreements.component';

describe('ListBusinessAgreementsComponent', () => {
  let component: ListBusinessAgreementsComponent;
  let fixture: ComponentFixture<ListBusinessAgreementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBusinessAgreementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBusinessAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
