import { Component, OnInit } from '@angular/core';
import { DepotService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-variant-depot-stock',
  templateUrl: './variant-depot-stock.component.html',
  styleUrls: ['./variant-depot-stock.component.css']
})
export class VariantDepotStockComponent implements OnInit {
  searchData:any;
  stockVariants: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  isExcelDownload: boolean = false;
  constructor(private dealer: DepotService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getstockVarList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getstockVarList() {
    let data = {"type":"DEPOTSTOCK","useType":"ALL"};
    this.dealer.depotVariant(data).subscribe((res: any) => {
      this.stockVariants=res.data;
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.stockVariants.length }];
      if(this.stockVariants.length > 0) {
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
    XLSX.writeFile(wb, "variantStockReport.xlsx");
  }
}
