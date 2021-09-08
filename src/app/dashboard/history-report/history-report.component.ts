import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-history-report',
  templateUrl: './history-report.component.html',
  styleUrls: ['./history-report.component.css']
})
export class HistoryReportComponent implements OnInit {
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
    this.fromDate = new Date("2015-01-01").toISOString();
    // this.currentDate = this.toDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).toISOString();
    this.toDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).toISOString();
   }

  ngOnInit(): void {
    this.getHistoryData();
    this.convertDate();
  }
  search(): void {
    const data = {
      chassisNo : this.chassisNo
    }
    if(this.chassisNo.length > 13) {
      this.service.histReports(data).subscribe((res: any) => {
        if(res.data.length === 1){
          this.histReportData = res.data;
          console.log('hist repo ==> ' + this.histReportData);
          this.dataChassisNo =this.chassisNo;
        } else {
          this.histReportData = [];
        }
      })
    }
  }
  convertDate(): void{
    function pad(s: string | number) { return (s < 10) ? '0' + s : s; }
    const d = new Date();
    this.currentDate = [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  }
  getHistoryData(){
    const data = {
      type: 'ALL',
      fromDate: (document.getElementById('fromDate') as HTMLInputElement).value + 'T00:00:00.000Z',
      toDate: (document.getElementById('toDate') as HTMLInputElement).value + 'T00:00:00.000Z',
      page: 'report',
      useType: 'ALL'
    };
    setTimeout(() => {
      this.service.histReports(data).subscribe((res: any) => {
        this.histReportData = res.data;
        this.limits.splice(4);
        this.limits.push({ key: 'ALL', value: this.histReportData.length });
        if (this.histReportData.length > 0) {
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
    XLSX.writeFile(wb, "historyReport.xlsx");
  }
  rowData(){
    const data ={
      chassisNo : this.chassisNo
    }
    this.service.getVehHistory(data).subscribe((res: any) =>{
      this.vehicleData = res.data;
      console.log('veh data -> '+ this.vehicleData);

    })
  }
}
