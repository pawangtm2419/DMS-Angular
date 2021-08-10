import { Component, OnInit } from '@angular/core';
import { DepotService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dealer-invoice',
  templateUrl: './dealer-invoice.component.html',
  styleUrls: ['./dealer-invoice.component.css']
})
export class DealerInvoiceComponent implements OnInit {
  searchData: any;
  invoiceData: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  fromDate: any;
  toDate: any;
  currentDate: any;

  constructor(private depot: DepotService, public toaster: ToasterService) {
    this.fromDate =  new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0).toISOString();
    this.toDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).toISOString();
   }

  ngOnInit(): void {
    this.getdealerInvoiceList();
    this.convertDate();
  }

  convertDate() {
    function pad(s: string | number) { return (s < 10) ? '0' + s : s; }
    const d = new Date();
    this.currentDate = [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  }

  getdealerInvoiceList() {
    const data = {
      type: 'ALL',
      fromDate: (document.getElementById('fromDate') as HTMLInputElement).value + 'T00:00:00.000Z',
      toDate: (document.getElementById('toDate') as HTMLInputElement).value + 'T00:00:00.000Z',
      useType: 'ALL'
    };
    this.depot.dealerInvoices(data).subscribe(res => {
      this.invoiceData = res.data;
      console.log(this.invoiceData);
      this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.invoiceData.length }];
      if (this.invoiceData.length > 0) {
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
    this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "dealerInvoiceReport.xlsx");
  }

}
