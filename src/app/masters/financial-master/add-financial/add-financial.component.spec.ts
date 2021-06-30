import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinancialComponent } from './add-financial.component';

describe('AddFinancialComponent', () => {
  let component: AddFinancialComponent;
  let fixture: ComponentFixture<AddFinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFinancialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
