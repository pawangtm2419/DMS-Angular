import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinancialComponent } from './edit-financial.component';

describe('EditFinancialComponent', () => {
  let component: EditFinancialComponent;
  let fixture: ComponentFixture<EditFinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFinancialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
