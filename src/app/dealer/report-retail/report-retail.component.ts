import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService, DealerReportService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-retail',
  templateUrl: './report-retail.component.html',
  styleUrls: ['./report-retail.component.css']
})
export class ReportRetailComponent implements OnInit {
  date = new Date();
  searchData:any;
  retailData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  fromDate: any;
  toDate: any;
  filterForm!: FormGroup;
  currentDate: any;
  isExcelDownload: boolean = false;
  zoneList: any;
  stateListData: any;
  dealerListData: any;
  selectZone: any;
  selectState: any;
  constructor(private dealer: DealerReportService, public toaster: ToasterService, private service: CommonService) {
    var date = this.date.getDate();
    var month = 1+this.date.getMonth();
    var year = this.date.getFullYear();
    this.fromDate =  year+"-"+(month<=9?'0':'')+month+"-"+'01';
    this.toDate = year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
    this.currentDate =  year+"-"+(month<=9?'0':'')+month+"-"+(date<=9?'0':'')+date;
  }

  ngOnInit(): void {
    this.getZoneList();
  }
  refresh(): void {
    this.ngOnInit();
  }

  getZoneList(): void {
    this.service.getZones().subscribe((data: any) => {
      if(data.status) {
        this.zoneList = data.zones;
      } else {
        this.toaster.showError("Zone", 'Data not found!');
      }
    },
      (error: any) => this.toaster.showError('Data', error)
    );
  }

  getStateList(data: any): void {
    this.service.getStatesByZone(data).subscribe((data: any) => {
      if(data.status) {
        this.stateListData = data.states;
      } else {
        this.toaster.showError("State", 'Data not found!');
      }
    },
      (error: any) => this.toaster.showError('Data', error)
    );
  }
  getDealers(data: any): void {
    this.service.getDealerList(data).subscribe((data: any) => {
      if(data.status) {
        this.dealerListData = data.msg;
      } else {
        this.toaster.showError("Dealer", 'Data not found!');
      }
    },
      (error: any) => this.toaster.showError('Data', error)
    );
  }

  getretailList(formData: any): void {
    let data = {
      zoneCode: formData.value.zone,
      stateName: formData.value.state,
      dealerCode: formData.value.dealer,
      fromDate: formData.value.fromDate +"T00:00:00.000Z",
      toDate: formData.value.toDate +"T00:00:00.000Z",
      isRetailed: false,
      useType: "ALL"
    };
    this.dealer.getretailReports(data).subscribe((res: any) => {
      if(res.status) {
        this.retailData = res.data;
        if(this.retailData.length > 0) {
          this.isExcelDownload = true;
          this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.retailData.length }];
          this.toaster.showSuccess("Data", "Report successfully Open.");
        } else {
          this.toaster.showInfo("Data", "No record found.");
        }
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error: any) => {
      this.toaster.showInfo("Data", error);
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "retailReport.xlsx");
  }
}
