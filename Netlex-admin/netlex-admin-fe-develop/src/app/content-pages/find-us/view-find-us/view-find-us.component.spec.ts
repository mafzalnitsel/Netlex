import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFindUsComponent } from './view-find-us.component';

describe('ViewFindUsComponent', () => {
  let component: ViewFindUsComponent;
  let fixture: ComponentFixture<ViewFindUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFindUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFindUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
