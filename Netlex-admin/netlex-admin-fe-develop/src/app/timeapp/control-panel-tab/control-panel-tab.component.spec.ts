import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelTabComponent } from './control-panel-tab.component';

describe('ControlPanelTabComponent', () => {
  let component: ControlPanelTabComponent;
  let fixture: ComponentFixture<ControlPanelTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPanelTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
