import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-history-report',
  templateUrl: './history-report.component.html',
  styleUrls: ['./history-report.component.css']
})
export class HistoryReportComponent implements OnInit {
  date = new Date();
  chassisNo: any;
  dataChassisNo: String = '';
  histReportData:any;
  pageData = 1;
  limits = [{ key: '50', value: 50 }, { key: '100', value: 100 }, { key: '250', value: 250 }, { key: '500', value: 500 }];
  limit: any = 50;
  fromDate: any;
  toDate: any;
  currentDate: any;
  isExcelDownload: boolean = false;
  vehicleData: any;
  constructor(private service : CommonService, public toaster : ToasterService) {
    var date = this.date.getDate();
    var month = 1+this.date.getMonth();
    var year = this.date.getFullYear();
    this.fromDate =  year+"-"+(month<=9?'0':'')+month+"-"+'01';
    this.toDate = year+"-"+((month<=9?'0':'')+month)+"-"+((date<=9?'0':'')+date);
    this.currentDate =  year+"-"+((month<=9?'0':'')+month)+"-"+((date<=9?'0':'')+date);
   }

  ngOnInit(): void { }
  search(): void {
    const data = { chassisNo : this.chassisNo };
    if(this.chassisNo.length > 13) {
      this.service.histReports(data).subscribe((res: any) => {
        if(res.status && res.data.length === 1) {
          this.histReportData = res.data;
          console.log('hist repo ==> ' + this.histReportData);
          this.dataChassisNo =this.chassisNo;
        } else {
          this.histReportData = [];
          this.toaster.showInfo('Data', 'No record found.');
        }
      }), (error: any) => {
        this.toaster.showError('Error', error);
      }
    }
  }

  getHistoryData(){
    const data = {
      type: 'ALL',
      fromDate: this.fromDate + 'T00:00:00.000Z',
      toDate: this.toDate + 'T00:00:00.000Z',
      page: 'report',
      useType: 'ALL'
    };
    setTimeout(() => {
      this.service.histReports(data).subscribe((res: any) => {
        if(res.status) {
          this.histReportData = res.data;
          this.limits.splice(4);
          this.limits.push({ key: 'ALL', value: this.histReportData.length });
          if (this.histReportData.length > 0) {
            this.isExcelDownload = true;
            this.toaster.showSuccess('Data', 'Report successfully Open.');
          } else {
            this.toaster.showInfo('Data', 'No record found.');
          }
        } else {
          this.toaster.showInfo('Data', 'No record found.');
        }
      }, (error: any) => {
        this.toaster.showError('Error', error);
      });
    }, 1000);
  }
  dataLimit(): void{
    this.limit = (document.getElementById('limit') as HTMLInputElement).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "historyReport.xlsx");
  }
  rowData(){
    const data = { chassisNo : this.chassisNo };
    this.service.getVehHistory(data).subscribe((res: any) => {
      if(res.status) {
        this.vehicleData = res.data;
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }), (error: any) => {
      this.toaster.showError('Error', error);
    }
  }
}
