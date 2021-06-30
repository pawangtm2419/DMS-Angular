import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-zone-master',
  templateUrl: './zone-master.component.html',
  styleUrls: ['./zone-master.component.css']
})
export class ZoneMasterComponent implements OnInit {
  zonesData: any;
  p: number = 1;
  pageSize = 50;

  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getzoneList();
  }
  getzoneList() {
    this.master.getzones().subscribe(res=> {
      this.zonesData=res.zones;
    }, (error) => {
      console.log(error);
    });
  }

  zoneDelete(code: String) {
    console.log(code);
  }
}
