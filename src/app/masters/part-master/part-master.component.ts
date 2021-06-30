import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-part-master',
  templateUrl: './part-master.component.html',
  styleUrls: ['./part-master.component.css']
})
export class PartMasterComponent implements OnInit {
  partsData: any;
  p: number = 1;
  pageSize = 50;
  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getPartList();
  }
  
  getPartList() {
    this.master.getParts().subscribe(res=> {
      this.partsData=res.data;
    }, (error) => {
      console.log(error);
    });
  }

  partDelete(code: String) {
    console.log(code);
  }
}
