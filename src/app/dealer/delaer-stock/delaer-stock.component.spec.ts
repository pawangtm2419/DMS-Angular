import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelaerStockComponent } from './delaer-stock.component';

describe('DelaerStockComponent', () => {
  let component: DelaerStockComponent;
  let fixture: ComponentFixture<DelaerStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelaerStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelaerStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
