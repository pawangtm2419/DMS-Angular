import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-on-power-master',
  templateUrl: './on-power-master.component.html',
  styleUrls: ['./on-power-master.component.css']
})
export class OnPowerMasterComponent implements OnInit {
  onPOwerData: any;
  p: number = 1;
  pageSize = 50;
  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getOnPoweList();
  }
  getOnPoweList() {
    this.master.getOnPower().subscribe(res=> {
      this.onPOwerData=res.data;
    }, (error) => {
      console.log(error);
    });
  }

  onPowerDelete(code: String) {
    console.log(code);
  }
}
