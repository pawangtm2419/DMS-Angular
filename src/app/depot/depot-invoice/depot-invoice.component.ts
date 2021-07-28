import { Component, OnInit } from '@angular/core';
import { DepotService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-depot-invoice',
  templateUrl: './depot-invoice.component.html',
  styleUrls: ['./depot-invoice.component.css']
})
export class DepotInvoiceComponent implements OnInit {
  searchData: any;
  invoiceData: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  constructor(private dealer: DepotService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getdepotInvoiceList();
  }
  getdepotInvoiceList() {
    const data = {type: 'ALL', fromDate: '2021-01-01T00:00:00.000Z', toDate: '2021-07-27T00:00:00.000Z', useType: 'ALL'};
    this.dealer.depotInvoices(data).subscribe(res => {
      this.invoiceData = res.data;
      if (this.invoiceData.length > 0) {
        this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.invoiceData.length }];
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      // console.log(error);
      this.toaster.showInfo('Data', error);
    });
  }

  dataLimit() {
    this.limit = (document.getElementById('limit') as HTMLInputElement).value;
  }
}
