import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelaerStockVariantwiseComponent } from './delaer-stock-variantwise.component';

describe('DelaerStockVariantwiseComponent', () => {
  let component: DelaerStockVariantwiseComponent;
  let fixture: ComponentFixture<DelaerStockVariantwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelaerStockVariantwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelaerStockVariantwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
