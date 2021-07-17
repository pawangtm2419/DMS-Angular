import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgSdReportComponent } from './bg-sd-report.component';

describe('BgSdReportComponent', () => {
  let component: BgSdReportComponent;
  let fixture: ComponentFixture<BgSdReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BgSdReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BgSdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
