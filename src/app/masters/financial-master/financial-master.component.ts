import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-financial-master',
  templateUrl: './financial-master.component.html',
  styleUrls: ['./financial-master.component.css']
})
export class FinancialMasterComponent implements OnInit {
  searchData:any;
  financialInstsData: any;
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getFinancialInst();
  }

  getFinancialInst() {
    this.master.getFinancialInst().subscribe(res=> {
      this.financialInstsData=res.data;
      if(this.financialInstsData.length > 0) {
        this.limits.push({ "key": "ALL", value: this.financialInstsData.length });
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

  financeDelete(code: String) {
    console.log(code);
  }
}
