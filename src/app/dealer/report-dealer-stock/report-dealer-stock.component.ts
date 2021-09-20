import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-dealer-stock',
  templateUrl: './report-dealer-stock.component.html',
  styleUrls: ['./report-dealer-stock.component.css']
})
export class ReportDealerStockComponent implements OnInit {
  searchData:any;
  stocksData: any;
  pageData: number = 1;
  limits = [{ "key": "50", "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  isExcelDownload: boolean = false;

  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getstockList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getstockList() {
    let data = {"type":"DEALERSTOCK","useType":"ALL"};
    this.dealer.getStocks(data).subscribe((res: any) => {
      this.stocksData=res.data;
      if(this.stocksData.length > 0) {
        this.isExcelDownload = true;
        this.limits.push({ "key": "ALL", "value": this.stocksData.length });
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
    XLSX.writeFile(wb, "dealerStockReport.xlsx");
  }
}
