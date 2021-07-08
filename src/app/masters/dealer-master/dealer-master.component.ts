import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-dealer-master',
  templateUrl: './dealer-master.component.html',
  styleUrls: ['./dealer-master.component.css']
})
export class DealerMasterComponent implements OnInit {
  searchData: any;
  dealerData: any;
  dealerInfo: any[] = [];
  title = "Dealer Master";
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getDealersList();
  }
  getDealersList() {
    let data = {useType: "ALL"};
    this.master.getDealers(data).subscribe(res=> {
      this.dealerData = res.msg;
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.dealerData.length }];
      if(this.dealerData.length > 0) {
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
  viewFullInfo(dealer: any) {
    this.dealerInfo = [dealer];
  }

}
