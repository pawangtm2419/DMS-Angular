import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotStockComponent } from './depot-stock.component';

describe('DepotStockComponent', () => {
  let component: DepotStockComponent;
  let fixture: ComponentFixture<DepotStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
