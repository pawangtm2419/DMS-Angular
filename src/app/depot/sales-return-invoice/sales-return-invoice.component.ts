import { Component, OnInit } from '@angular/core';
import { DepotService, ToasterService, UserService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sales-return-invoice',
  templateUrl: './sales-return-invoice.component.html',
  styleUrls: ['./sales-return-invoice.component.css']
})
export class SalesReturnInvoiceComponent implements OnInit {
  searchData:any;
  invoiceData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  isExcelDownload:boolean = false;
  constructor(private dealer: DepotService, private toaster: ToasterService, private user: UserService) { }

  ngOnInit(): void {
    this.getSalesInvoiceList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getSalesInvoiceList() {
    let data = {"type":"ALL","fromDate":"2021-01-01T00:00:00.000Z","toDate":"2021-07-27T00:00:00.000Z","useType":"ALL"};
    this.dealer.salesRetInvoices(data).subscribe((res: any) => {
      this.invoiceData=res.data;
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.invoiceData.length }];
      if(this.invoiceData.length > 0) {
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
    XLSX.writeFile(wb, "salesReturnInvoiceReport.xlsx");
  }
}
