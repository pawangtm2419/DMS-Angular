import { Component, OnInit } from '@angular/core';
import { ToasterService, DealerService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  date = new Date();
  searchData: any;
  invoiceData: any;
  pageData = 1;
  limits = [{ key: '50', value: 50 }, { key: '100', value: 100 }, { key: '250', value: 250 }, { key: '500', value: 500 }];
  limit: any = 50;
  fromDate: any;
  toDate: any;
  currentDate: any;
  isExcelDownload: boolean = false;
  constructor(private dealer: DealerService, public toaster: ToasterService) {
    var date = this.date.getDate();
    var month = 1+this.date.getMonth();
    var year = this.date.getFullYear();
    this.fromDate =  year+"-"+(month<=9?'0':'')+month+"-"+'01';
    this.toDate = year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
    this.currentDate =  year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
   }

  ngOnInit(): void {
    this.getinvoiceData();
  }
  refresh(): void {
    this.ngOnInit();
  }

  getinvoiceData(): void{
    const data = {
      type: 'ALL',
      fromDate: this.fromDate + 'T00:00:00.000Z',
      toDate: this.toDate + 'T00:00:00.000Z',
      page: 'report',
      useType: 'ALL'
    };
    setTimeout(() => {
      this.dealer.invoiceReport(data).subscribe(res => {
        this.invoiceData = res.data;
        this.limits.splice(4);
        this.limits.push({ key: 'ALL', value: this.invoiceData.length });
        if (this.invoiceData.length > 0) {
          this.isExcelDownload = true;
          this.toaster.showSuccess('Data', 'Report successfully Open.');
        } else {
          this.toaster.showInfo('Data', 'No record found.');
        }
      }, (error) => {
        this.toaster.showError('Error', error);
      });
    }, 1000);
  }

  dataLimit(): void{
    this.limit = (document.getElementById('limit') as HTMLInputElement).value;
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "invoiceReport.xlsx");
  }

}
