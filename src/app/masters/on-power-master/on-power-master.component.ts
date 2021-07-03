import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';
import { ToasterService } from 'src/app/shared/services/toster.service';

@Component({
  selector: 'app-on-power-master',
  templateUrl: './on-power-master.component.html',
  styleUrls: ['./on-power-master.component.css']
})
export class OnPowerMasterComponent implements OnInit {
  onPOwerData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 10;
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getOnPoweList();
  }
  getOnPoweList() {
    this.master.getOnPower().subscribe(res=> {
      this.onPOwerData=res.data;
      this.limits = [{ "key": 10, "value": 10 }, { "key": 25, "value": 25 }, { "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { key: "ALL", value: this.onPOwerData.length }];
      if(this.onPOwerData.length > 0) {
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showError("Error", error);
    });
  }

  onPowerDelete(code: String) {
    console.log(code);
  }

  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
}
