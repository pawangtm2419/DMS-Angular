import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantDepotStockComponent } from './variant-depot-stock.component';

describe('VariantDepotStockComponent', () => {
  let component: VariantDepotStockComponent;
  let fixture: ComponentFixture<VariantDepotStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantDepotStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantDepotStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
