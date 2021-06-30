import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-depot-master',
  templateUrl: './depot-master.component.html',
  styleUrls: ['./depot-master.component.css']
})
export class DepotMasterComponent implements OnInit {
  property: any;
  depotData: any[] = [];
  depotInfo: any[] = [];
  p: number = 1;

  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getDepotData();
  }

  getDepotData() {
    let data = {useType: "ALL"};
    this.master.depotMaster(data).subscribe(res=> {
      this.depotData=res.data;
    }, (error) => {
      console.log(error);
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
