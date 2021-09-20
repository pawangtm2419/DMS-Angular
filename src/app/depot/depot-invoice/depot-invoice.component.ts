import { Component, OnInit } from '@angular/core';
import { DepotService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-depot-invoice',
  templateUrl: './depot-invoice.component.html',
  styleUrls: ['./depot-invoice.component.css']
})
export class DepotInvoiceComponent implements OnInit {
  date: Date = new Date();
  searchData: any;
  invoiceData: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  currentDate: any;
  fromDate: any;
  toDate: any;
  isExcelDownload: boolean = false;
  constructor(private depot: DepotService, public toaster: ToasterService) {
    var date = this.date.getDate();
    var month = 1+this.date.getMonth();
    var year = this.date.getFullYear();
    this.fromDate =  year+"-"+(month<=9?'0':'')+month+"-"+'01';
    this.toDate = year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
    this.currentDate =  year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
   }

  ngOnInit(): void {
    this.getdepotInvoiceList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getdepotInvoiceList() {
    const data = {
      type: 'ALL',
      fromDate: this.fromDate + 'T00:00:00.000Z',
      toDate: this.toDate + 'T00:00:00.000Z',
      useType: 'ALL'
    };
    this.depot.depotInvoices(data).subscribe((res: any) => {
      this.invoiceData = res.data;
      if (this.invoiceData.length > 0) {
        this.isExcelDownload = true;
        this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.invoiceData.length }];
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      // this.toaster.showError('Data', error);;
      this.toaster.showInfo('Data', error);
    });
  }

  dataLimit() {
    this.limit = (document.getElementById('limit') as HTMLInputElement).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "depotInvoiceReport.xlsx");
  }
}
