import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-rts',
  templateUrl: './report-rts.component.html',
  styleUrls: ['./report-rts.component.css']
})
export class ReportRtsComponent implements OnInit {

  searchData:any;
  rtsReports: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  isExcelDownload: boolean = false;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getrtsList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getrtsList() {
    let data = {"isRetailed":false,"useType":"ALL"};
    this.dealer.getRtsReports(data).subscribe((res: any) => {
      this.rtsReports=res.data;
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.rtsReports.length }];
      if(this.rtsReports.length > 0) {
        this.isExcelDownload = true;
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error: any) => {
      // this.toaster.showError('Data', error);;
      this.toaster.showInfo("Data", error);
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "rtsReport.xlsx");
  }
}
