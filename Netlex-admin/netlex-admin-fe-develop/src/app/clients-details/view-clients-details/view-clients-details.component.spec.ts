import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientsDetailsComponent } from './view-clients-details.component';

describe('ViewClientsDetailsComponent', () => {
  let component: ViewClientsDetailsComponent;
  let fixture: ComponentFixture<ViewClientsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClientsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClientsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
