import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-delivery',
  templateUrl: './report-delivery.component.html',
  styleUrls: ['./report-delivery.component.css']
})
export class ReportDeliveryComponent implements OnInit {

  searchData:any;
  deliveryData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  isExcelDownload:boolean = false;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getdelList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getdelList() {
    let data = {"fromDate":"2021-06-01T00:00:00.000Z","toDate":"2021-07-20T00:00:00.000Z","useType":"ALL"};
    this.dealer.getDelReports(data).subscribe((res: any)=> {
      this.deliveryData=res.data;
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.deliveryData.length }];
      if(this.deliveryData.length > 0) {
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
    XLSX.writeFile(wb, "deliveryReport.xlsx");
  }
}
