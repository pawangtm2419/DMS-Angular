import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTransferNoteComponent } from './generate-transfer-note.component';

describe('GenerateTransferNoteComponent', () => {
  let component: GenerateTransferNoteComponent;
  let fixture: ComponentFixture<GenerateTransferNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTransferNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTransferNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
