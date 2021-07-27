import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-report-advance',
  templateUrl: './report-advance.component.html',
  styleUrls: ['./report-advance.component.css']
})
export class ReportAdvanceComponent implements OnInit {

  searchData:any;
  advanceData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getadvReportList();
  }
  getadvReportList() {
    let data = {"useType":"ALL"};
    this.dealer.getAdvReports(data).subscribe(res=> {
      this.advanceData=res.data;
      if(this.advanceData.length > 0) {
        this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.advanceData.length }];
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
