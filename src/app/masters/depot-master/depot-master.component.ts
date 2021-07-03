import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';
import { ToasterService } from 'src/app/shared/services/toster.service';

@Component({
  selector: 'app-depot-master',
  templateUrl: './depot-master.component.html',
  styleUrls: ['./depot-master.component.css']
})
export class DepotMasterComponent implements OnInit {
  property: any;
  depotData: any[] = [];
  depotInfo: any[] = [];
  pageData: number = 1;
  limits: any;
  limit: any = 10;

  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getDepotData();
  }

  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }

  getDepotData() {
    let data = {useType: "ALL"};
    this.master.depotMaster(data).subscribe(res=> {
      this.depotData=res.data;
      this.limits = [{ "key": 10, "value": 10 }, { "key": 25, "value": 25 }, { "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { key: "ALL", value: this.depotData.length }];
      if(this.depotData.length > 0) {
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showInfo("Data", error);
    });
  }

  viewFullInfo(depot: any) {
    this.depotInfo = [depot];
  }

  depotDelete(id: any) {
    const data = { _id : id, depotStatus: 'In Active' };
    this.master.deleteDepot(data).subscribe(res=> {
      if(res.status) {
        window.alert(res.msg);
        this.getDepotData();
      }
    }, (error) => {
      console.log(error);
    });
  }

}
