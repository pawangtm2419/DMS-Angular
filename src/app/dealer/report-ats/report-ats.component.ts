import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-ats',
  templateUrl: './report-ats.component.html',
  styleUrls: ['./report-ats.component.css']
})
export class ReportAtsComponent implements OnInit {
  searchData: any;
  atsReports: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  isExcelDownload:boolean = false;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getatsList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getatsList(): void {
    const data = {isRetailed: false, useType: 'ALL'};
    this.dealer.getAtsReports(data).subscribe((res: any) => {
      this.atsReports = res.data;
      this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.atsReports.length }];
      if (this.atsReports.length > 0) {
        this.isExcelDownload = true;
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error: string) => {
      this.toaster.showInfo('Data', error);
    });
  }
  dataLimit(): void {
    this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "atsReport.xlsx");
  }
}
