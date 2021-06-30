import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-transporter-master',
  templateUrl: './transporter-master.component.html',
  styleUrls: ['./transporter-master.component.css']
})
export class TransporterMasterComponent implements OnInit {
  transporterData: any;
  p: number = 1;
  pageSize = 50;
  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getTransporterList();
  }
  getTransporterList() {
    this.master.getTransporter().subscribe(res=> {
      this.transporterData=res.data;
    }, (error) => {
      console.log(error);
    });
  }
  transportDelete(code: String) {
    console.log(code);
  }
}
