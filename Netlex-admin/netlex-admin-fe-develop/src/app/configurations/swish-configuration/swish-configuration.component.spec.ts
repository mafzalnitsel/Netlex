import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwishConfigurationComponent } from './swish-configuration.component';

describe('SwishConfigurationComponent', () => {
  let component: SwishConfigurationComponent;
  let fixture: ComponentFixture<SwishConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwishConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwishConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
