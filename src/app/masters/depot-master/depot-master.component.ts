import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-depot-master',
  templateUrl: './depot-master.component.html',
  styleUrls: ['./depot-master.component.css']
})
export class DepotMasterComponent implements OnInit {
  searchData:any;
  property: any;
  depotData: any;
  depotInfo: any[] = [];
  pageData: number = 1;
  limits: any;
  limit: any = 50;

  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getDepotData();
  }
  getDepotData() {
    let data = {useType: "ALL"};
    this.master.depotMaster(data).subscribe(res=> {
      this.depotData=res.data;
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.depotData.length }];
      if(this.depotData.length > 0) {
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      // console.log(error);
      this.toaster.showInfo("Data", error);
    });
  }

  viewFullInfo(depot: any) {
    this.depotInfo = [depot];
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
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
