import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-report-aging-from-recieved',
  templateUrl: './report-aging-from-recieved.component.html',
  styleUrls: ['./report-aging-from-recieved.component.css']
})
export class ReportAgingFromRecievedComponent implements OnInit {
  searchData:any;
  ageRecData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getAgingProdList();
  }
  getAgingProdList() {
    let data = {"locationType":"DEALER","useType":"ALL"};
    this.dealer.getAgingRec(data).subscribe(res=> {
      this.ageRecData=res.data;
      if(this.ageRecData.length > 0) {
        this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.ageRecData.length }];
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showInfo("Data", error);
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
}
