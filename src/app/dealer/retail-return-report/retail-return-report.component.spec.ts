import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailReturnReportComponent } from './retail-return-report.component';

describe('RetailReturnReportComponent', () => {
  let component: RetailReturnReportComponent;
  let fixture: ComponentFixture<RetailReturnReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailReturnReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
