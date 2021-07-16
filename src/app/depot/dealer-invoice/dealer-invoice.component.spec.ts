import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerInvoiceComponent } from './dealer-invoice.component';

describe('DealerInvoiceComponent', () => {
  let component: DealerInvoiceComponent;
  let fixture: ComponentFixture<DealerInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
