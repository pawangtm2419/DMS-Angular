import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-dealer-stock-variant-wise',
  templateUrl: './report-dealer-stock-variant-wise.component.html',
  styleUrls: ['./report-dealer-stock-variant-wise.component.css']
})
export class ReportDealerStockVariantWiseComponent implements OnInit {
  searchData:any;
  stockVariants: any;
  pageData: number = 1;
  limits = [{ "key": "50", "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  isExcelDownload:boolean = false;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getstockVarWiseList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getstockVarWiseList() {
    let data = {"type":"DEALERSTOCK","useType":"ALL"};
    this.dealer.getStocksVarWise(data).subscribe(res=> {
      this.stockVariants=res.data;
      this.limits.push({ "key": "ALL", "value": this.stockVariants.length });
      if(this.stockVariants.length > 0) {
        this.isExcelDownload = true;
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
    XLSX.writeFile(wb, "dealerStockVariantReport.xlsx");
  }
}
