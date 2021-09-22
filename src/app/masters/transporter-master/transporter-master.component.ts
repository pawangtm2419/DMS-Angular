import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService, UserService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-transporter-master',
  templateUrl: './transporter-master.component.html',
  styleUrls: ['./transporter-master.component.css']
})
export class TransporterMasterComponent implements OnInit {
  searchData: any;
  transporterData: any;
  transportInfo: any[] = [];
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  isExcelDownload:boolean = false;
  filterTransportData: any;
  transportStatus: boolean = false;
  constructor(private master: MastersService, private toaster: ToasterService, private user: UserService) { }

  ngOnInit(): void {
    this.getTransporterList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getTransporterList() {
    this.master.getTransporter().subscribe((res: any)=> {
      if(res.status) {
        this.transporterData=res.data;
        this.transportStatus = false;
        this.showInActive();
        if(this.transporterData.length > 0) {
          this.isExcelDownload = true;
          this.limits.push({ "key": "ALL", value: this.transporterData.length });
          this.toaster.showSuccess("Data", "Report successfully Open.");
        } else {
          this.toaster.showInfo("Data", "No record found.");
        }
      } else {
        this.toaster.showError("Server Error", res.error.message);
      }
    }, (error: any) => {
      this.toaster.showError('Data', error);;
    });
  }
  showInActive(): void{
    this.filterTransportData = this.transporterData;
    this.filterTransportData = this.filterTransportData.filter((transporter:any) =>{
      return transporter.isDeleted === this.transportStatus;
    });
    this.transportStatus = !this.transportStatus;
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
  viewFullInfo(transporter: any) {
    this.transportInfo = [transporter];
  }
  transportDelete(code: String) {
    console.log(code);
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "transportReport.xlsx");
  }
}
