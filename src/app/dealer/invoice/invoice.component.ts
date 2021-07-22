import { Component, OnInit } from '@angular/core';
import { ToasterService, DealerService } from 'src/app/shared/services';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  searchData: any;
  invoiceData: any;
  pageData: number = 1;
  limits = [{ "key": "50", "value": 50 }, { "key": "100", "value": 100 }, { "key": "250", "value": 250 }, { "key": "500", "value": 500 }];
  limit: any = 50;

  constructor(private dealer: DealerService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getinvoiceData();
  }

  getinvoiceData() {
    let data = {"type":"ALL","fromDate":"2021-01-01T00:00:00.000Z","toDate":"2021-07-22T00:00:00.000Z","page":"report","useType":"ALL"};
    this.dealer.invoiceReport(data).subscribe(res=> {
      this.invoiceData=res.data;
      this.limits.push({ "key": "ALL", value: this.invoiceData.length });
      if(this.invoiceData.length > 0) {
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showError("Error", error);
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
}
