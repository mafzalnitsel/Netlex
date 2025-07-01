import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPagesTabComponent } from './my-pages-tab.component';

describe('MyPagesTabComponent', () => {
  let component: MyPagesTabComponent;
  let fixture: ComponentFixture<MyPagesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPagesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPagesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
