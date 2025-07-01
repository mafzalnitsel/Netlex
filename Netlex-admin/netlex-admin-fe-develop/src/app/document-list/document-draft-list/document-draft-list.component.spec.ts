import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDraftListComponent } from './document-draft-list.component';

describe('DocumentDraftListComponent', () => {
  let component: DocumentDraftListComponent;
  let fixture: ComponentFixture<DocumentDraftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDraftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
