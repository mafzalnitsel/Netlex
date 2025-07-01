import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlarnaConfigurationComponent } from './klarna-configuration.component';

describe('KlarnaConfigurationComponent', () => {
  let component: KlarnaConfigurationComponent;
  let fixture: ComponentFixture<KlarnaConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlarnaConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlarnaConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
