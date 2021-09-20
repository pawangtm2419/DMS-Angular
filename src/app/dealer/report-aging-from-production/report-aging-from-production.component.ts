import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-aging-from-production',
  templateUrl: './report-aging-from-production.component.html',
  styleUrls: ['./report-aging-from-production.component.css']
})
export class ReportAgingFromProductionComponent implements OnInit {
  searchData:any;
  ageProdData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  total: any;
  isExcelDownload: boolean = false;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getAgingProdList();
  }
  getAgingProdList() {
    let data = {"locationType":"DEALER","type":"production","useType":"ALL"};
    this.dealer.getAgingProd(data).subscribe(res=> {
      this.ageProdData=res.data;
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.ageProdData.length }];
      if(this.ageProdData.length > 0) {
        this.isExcelDownload = true;
        this.total ={
          count30: 0, count3060: 0, count6090: 0, count90120: 0, count120180: 0, count180: 0, count: 0
        }
        this.ageProdData.forEach((item: { count30: any; count3060:any, count6090:any; count90120: any; count120180: any; count180:any; count: any;}) => {
          this.total.count30 = this.total.count30 + item.count30;
          this.total.count3060 = this.total.count3060 + item.count3060;
          this.total.count6090 = this.total.count6090 + item.count6090;
          this.total.count90120 = this.total.count90120 + item.count90120;
          this.total.count120180 = this.total.count120180 + item.count120180;
          this.total.count180 = this.total.count180 + item.count180;
          this.total.count = this.total.count + item.count;
        });
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      // this.toaster.showError('Data', error);;
      this.toaster.showInfo("Data", error);
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "agingFromProductionReport.xlsx");
  }
}
