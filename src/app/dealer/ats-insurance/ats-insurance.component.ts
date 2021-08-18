import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { CommonService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

interface selectedObject {
  [key: string]: any
}

@Component({
  selector: 'app-ats-insurance',
  templateUrl: './ats-insurance.component.html',
  styleUrls: ['./ats-insurance.component.css']
})
export class AtsInsuranceComponent implements OnInit {
  searchData: any;
  InsuranceData: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  zoneList: any;
  selectedZoneName: any = '';
  selectedStateName: any = '';
  data: selectedObject = {"useType":"ALL"}
  stateListData: any;
  dealerListData: any;
  fromDate: string;
  toDate: string;
  currentDate: any;
  isInsuranceData: boolean = false;
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
  getAtsInsuList(atsFilterForm: NgForm) {
    const atsFilter = atsFilterForm.value;
    if(atsFilter.zoneCode) {
      this.data['zoneCode'] = atsFilter.zoneCode;
    }
    if(atsFilter.stateName) {
      this.data['stateName'] = atsFilter.stateName;
    }
    if(atsFilter.dealerCode) {
      this.data['dealerCode'] = atsFilter.dealerCode;
    }
    if(atsFilter.fromDate && atsFilter.toDate) {
      this.data['fromDate'] = atsFilter.fromDate+"T00:00:00.000Z";
      this.data['toDate'] = atsFilter.toDate+"T00:00:00.000Z";
    }
    this.service.getvehInsurance(this.data).subscribe(res => {
      this.InsuranceData = res.data;
      if (this.InsuranceData.length > 0) {
        this.isInsuranceData = true;
        this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.InsuranceData.length }];
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
    XLSX.writeFile(wb, "atsInsuranceReport.xlsx");
  }
}
