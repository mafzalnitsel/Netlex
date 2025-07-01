import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadPreventDialogComponent } from './reload-prevent-dialog.component';

describe('ReloadPreventDialogComponent', () => {
  let component: ReloadPreventDialogComponent;
  let fixture: ComponentFixture<ReloadPreventDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReloadPreventDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadPreventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
