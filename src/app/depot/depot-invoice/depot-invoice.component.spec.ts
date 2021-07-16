import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotInvoiceComponent } from './depot-invoice.component';

describe('DepotInvoiceComponent', () => {
  let component: DepotInvoiceComponent;
  let fixture: ComponentFixture<DepotInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
