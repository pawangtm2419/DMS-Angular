import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-financial-master',
  templateUrl: './financial-master.component.html',
  styleUrls: ['./financial-master.component.css']
})
export class FinancialMasterComponent implements OnInit {
  financialInstsData: any;
  p: number = 1;
  pageSize = 50;

  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getFinancialInst();
  }
  
  getFinancialInst() {
    this.master.getFinancialInst().subscribe(res=> {
      this.financialInstsData=res.data;
    }, (error) => {
      console.log(error);
    });
  }

  financeDelete(code: String) {
    console.log(code);
  }
}
