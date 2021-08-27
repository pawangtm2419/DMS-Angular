import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-retail',
  templateUrl: './report-retail.component.html',
  styleUrls: ['./report-retail.component.css']
})
export class ReportRetailComponent implements OnInit {
  searchData:any;
  retailData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  isExcelDownload: boolean = false;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getretailList();
  }
  getretailList() {
    let data = {"fromDate":"2021-03-15T00:00:00.000Z","toDate":"2021-07-20T00:00:00.000Z","isRetailed":false,"useType":"ALL"};
    this.dealer.getretailReports(data).subscribe(res=> {
      this.retailData=res.data;
      if(this.retailData.length > 0) {
        this.isExcelDownload = true;
        this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.retailData.length }];
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showInfo("Data", error);
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "retailReport.xlsx");
  }
}
