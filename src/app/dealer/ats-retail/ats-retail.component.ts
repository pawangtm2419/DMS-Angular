import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { CommonService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

interface selectedObject {
  [key: string]: any
}

@Component({
  selector: 'app-ats-retail',
  templateUrl: './ats-retail.component.html',
  styleUrls: ['./ats-retail.component.css']
})
export class AtsRetailComponent implements OnInit {
  searchData: any;
  retailData: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  zoneList: any;
  selectedZoneName: any = '';
  selectedStateName: any = '';
  // data: any = {"type":"ADVANCE","fromDate":"2020-05-07T00:00:00.000Z","toDate":"2021-08-12T00:00:00.000Z","code":"10003151","state":"Maharashtra","zone":"ZONE2","useType":"ALL"}
  data: selectedObject = {"type":"ADVANCE", "useType":"ALL"}
  stateListData: any;
  dealerListData: any;
  fromDate: string;
  toDate: string;
  currentDate: any;
  isRetailData: boolean = false;
  constructor(private service: CommonService, public toaster: ToasterService) {
    this.fromDate =  new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0).toISOString();
    this.toDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).toISOString();
  }

  ngOnInit(): void {
    this.getZoneList();
    this.convertDate();
  }
  convertDate(): void{
    function pad(s: string | number) { return (s < 10) ? '0' + s : s; }
    const d = new Date();
    this.currentDate = [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  }
  getZoneList(): void {
    this.service.getZones().subscribe(data => {
      if(data.status === 'true') {
        this.zoneList = data.zones;
      }
    },
      error => console.log(error)
    );
  }
  getStateList(data: any): void {
    this.service.getStatesByZone(data).subscribe(data => {
      if(data.status === 'true') {
        this.stateListData = data.states;
      }
    },
      error => console.log(error)
    );
  }
  getDealers(data: any): void {
    this.service.getDealerList(data).subscribe(data => {
      if(data.status === 'true') {
        this.dealerListData = data.msg;
      }
    },
      error => console.log(error)
    );
  }
  getAtsRetailList(atsFilterForm: NgForm) {
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
    this.service.getVehicleDetails(this.data).subscribe(res => {
      this.retailData = res.data;
      if (this.retailData.length > 0) {
        this.isRetailData = true;
        this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.retailData.length }];
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      this.toaster.showInfo('Data', error);
    });
  }
  dataLimit() {
    this.limit = (document.getElementById('limit') as HTMLInputElement).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "atsRetailReport.xlsx");
  }
}
