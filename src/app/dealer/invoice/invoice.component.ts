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
  pageData = 1;
  limits = [{ key: '50', value: 50 }, { key: '100', value: 100 }, { key: '250', value: 250 }, { key: '500', value: 500 }];
  limit: any = 50;
  fromDate: any;
  toDate: any;
  currentDate: any;

  constructor(private dealer: DealerService, public toaster: ToasterService) {
    this.fromDate =  new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0).toISOString();
    this.toDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).toISOString();
   }

  ngOnInit(): void {
    this.getinvoiceData();
    this.convertDate();
  }

  convertDate(): void{
    function pad(s: string | number) { return (s < 10) ? '0' + s : s; }
    const d = new Date();
    this.currentDate = [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  }
  getinvoiceData(): void{
    const data = {
      type: 'ALL',
      fromDate: (document.getElementById('fromDate') as HTMLInputElement).value + 'T00:00:00.000Z',
      toDate: (document.getElementById('toDate') as HTMLInputElement).value + 'T00:00:00.000Z',
      page: 'report',
      useType: 'ALL'
    };
    setTimeout(() => {
      this.dealer.invoiceReport(data).subscribe(res => {
        this.invoiceData = res.data;
        this.limits.splice(4);
        this.limits.push({ key: 'ALL', value: this.invoiceData.length });
        if (this.invoiceData.length > 0) {
          this.toaster.showSuccess('Data', 'Report successfully Open.');
        } else {
          this.toaster.showInfo('Data', 'No record found.');
        }
      }, (error) => {
        this.toaster.showError('Error', error);
      });
    }, 3000);
  }

  dataLimit(): void{
    this.limit = (document.getElementById('limit') as HTMLInputElement).value;
  }

}
