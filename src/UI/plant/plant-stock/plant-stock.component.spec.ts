import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantStockComponent } from './plant-stock.component';

describe('PlantStockComponent', () => {
  let component: PlantStockComponent;
  let fixture: ComponentFixture<PlantStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
