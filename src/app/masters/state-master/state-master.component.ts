import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.css']
})
export class StateMasterComponent implements OnInit {
  stateData: any;
  p: number = 1;
  pageSize = 50;

  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getStateList();
  }
  getStateList() {
    this.master.getState().subscribe(res=> {
      this.stateData=res.data;
    }, (error) => {
      console.log(error);
    });
  }

  stateDelete(code: String) {
    console.log(code);
  }
}
