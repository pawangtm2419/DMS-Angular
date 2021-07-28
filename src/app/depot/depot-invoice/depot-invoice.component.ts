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
  currentDate: any;
  fromDate: any;
  toDate: any;

  constructor(private depot: DepotService, public toaster: ToasterService) {
    this.fromDate =  new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0).toISOString();
    this.toDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).toISOString();
   }

  ngOnInit(): void {
    this.getdepotInvoiceList();
    this.convertDate();
  }

  convertDate() {
    function pad(s: string | number) { return (s < 10) ? '0' + s : s; }
    const d = new Date();
    this.currentDate = [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  }

  getdepotInvoiceList() {
    const data = {
      type: 'ALL',
      fromDate: (document.getElementById('fromDate') as HTMLInputElement).value + 'T00:00:00.000Z',
      toDate: (document.getElementById('toDate') as HTMLInputElement).value + 'T00:00:00.000Z',
      useType: 'ALL'
    };
    this.depot.depotInvoices(data).subscribe(res => {
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
