import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { CommonService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

interface selectedObject {
  [key: string]: any
}

@Component({
  selector: 'app-ats-delivery',
  templateUrl: './ats-delivery.component.html',
  styleUrls: ['./ats-delivery.component.css']
})
export class AtsDeliveryComponent implements OnInit {
  date: Date = new Date();
  searchData: any;
  atsDelData: string[] = [];
  pageData = 1;
  limits: any;
  limit: any = 50;
  zoneList: any;
  selectedZoneName: any = '';
  selectedStateName: any = '';
  data : selectedObject = { "type":"PHYSICAL", "useType":"ALL" };
  stateListData: any;
  dealerListData: any;
  fromDate: string;
  toDate: string;
  currentDate: any;
  isExcelDownload: boolean = false;
  constructor(private service: CommonService, public toaster: ToasterService) {
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
      }
    },
      error => this.toaster.showError('Data', error)
    );
  }
  getStateList(data: any): void {
    this.service.getStatesByZone(data).subscribe((data: any) => {
      if(data.status) {
        this.stateListData = data.states;
      }
    },
      error => this.toaster.showError('Data', error)
    );
  }
  getDealers(data: any): void {
    this.service.getDealerList(data).subscribe((data: any) => {
      if(data.status) {
        this.dealerListData = data.msg;
      }
    },
      error => this.toaster.showError('Data', error)
    );
  }
  getAtsDeliveryList(atsFilterForm: NgForm) {
    const atsFilter = atsFilterForm.value;
    if(atsFilter.zoneCode) {
      this.data['zone'] = atsFilter.zoneCode;
    }
    if(atsFilter.stateName) {
      this.data['state'] = atsFilter.stateName;
    }
    if(atsFilter.dealerCode) {
      this.data['code'] = atsFilter.dealerCode;
    }
    if(atsFilter.fromDate && atsFilter.toDate) {
      this.data['fromDate'] = atsFilter.fromDate+"T00:00:00.000Z";
      this.data['toDate'] = atsFilter.toDate+"T00:00:00.000Z";
    }
     const deliveryData = this.service.getVehicleDetails(this.data).subscribe((res: any) => {
      this.atsDelData = res.data;
      if (this.atsDelData.length > 0) {
        this.isExcelDownload = true;
        this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.atsDelData.length }];
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error: any) => {
      this.toaster.showError('Data', error);
    });
    setTimeout(() => {
      deliveryData.unsubscribe();
    }, 10000);
  }
  dataLimit() {
    this.limit = (document.getElementById('limit') as HTMLInputElement).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "atsDeliveryReport.xlsx");
  }
}
