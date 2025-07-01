import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFindUsComponent } from './create-find-us.component';

describe('CreateFindUsComponent', () => {
  let component: CreateFindUsComponent;
  let fixture: ComponentFixture<CreateFindUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFindUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFindUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
