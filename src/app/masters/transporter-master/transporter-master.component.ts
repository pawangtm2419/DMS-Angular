import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';

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
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getTransporterList();
  }
  getTransporterList() {
    this.master.getTransporter().subscribe(res=> {
      this.transporterData=res.data;
      if(this.transporterData.length > 0) {
        this.limits.push({ "key": "ALL", value: this.transporterData.length });
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      console.log(error);
    });
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
}
