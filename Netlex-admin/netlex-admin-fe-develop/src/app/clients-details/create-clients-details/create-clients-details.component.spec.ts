import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientsDetailsComponent } from './create-clients-details.component';

describe('CreateClientsDetailsComponent', () => {
  let component: CreateClientsDetailsComponent;
  let fixture: ComponentFixture<CreateClientsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClientsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
