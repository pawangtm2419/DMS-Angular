import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalizedStockComponent } from './capitalized-stock.component';

describe('CapitalizedStockComponent', () => {
  let component: CapitalizedStockComponent;
  let fixture: ComponentFixture<CapitalizedStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapitalizedStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalizedStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
