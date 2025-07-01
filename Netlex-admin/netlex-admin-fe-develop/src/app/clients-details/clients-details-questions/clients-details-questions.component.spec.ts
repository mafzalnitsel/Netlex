import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsDetailsQuestionsComponent } from './clients-details-questions.component';

describe('ClientsDetailsQuestionsComponent', () => {
  let component: ClientsDetailsQuestionsComponent;
  let fixture: ComponentFixture<ClientsDetailsQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsDetailsQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsDetailsQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
