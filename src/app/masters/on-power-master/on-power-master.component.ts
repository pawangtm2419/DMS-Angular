import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-on-power-master',
  templateUrl: './on-power-master.component.html',
  styleUrls: ['./on-power-master.component.css']
})
export class OnPowerMasterComponent implements OnInit {
  searchData: any;
  onPOwerData: any;
  onPowerInfo: any[] = [];
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getOnPoweList();
  }
  getOnPoweList() {
    this.master.getOnPower().subscribe(res=> {
      this.onPOwerData=res.data;
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.onPOwerData.length }];
      if(this.onPOwerData.length > 0) {
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showError("Error", error);
    });
  }
  viewFullInfo(onPower: any) {
    this.onPowerInfo = [onPower];
  }
  onPowerDelete(code: String) {
    console.log(code);
  }

  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
}
