import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';

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

  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getstockList();
  }
  getstockList() {
    let data = {"type":"DEALERSTOCK","useType":"ALL"};
    this.dealer.getStocks(data).subscribe(res=> {
      this.stocksData=res.data;
      this.limits.push({ "key": "ALL", "value": this.stocksData.length });
      if(this.stocksData.length > 0) {
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      // console.log(error);
      this.toaster.showInfo("Data", error);
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }

}
