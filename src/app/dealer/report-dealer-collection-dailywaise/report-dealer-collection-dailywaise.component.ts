import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-report-dealer-collection-dailywaise',
  templateUrl: './report-dealer-collection-dailywaise.component.html',
  styleUrls: ['./report-dealer-collection-dailywaise.component.css']
})
export class ReportDealerCollectionDailywaiseComponent implements OnInit {
  searchData:any;
  collectionDaywises: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getcolDayWiseList();
  }
  getcolDayWiseList() {
    let data = {"fromDate":"2020-01-30T18:30:00.000Z","toDate":"2021-02-19T18:30:00.000Z","useType":"ALL"};
    this.dealer.getCollectionDaywise(data).subscribe(res=> {
      this.collectionDaywises=res.data;
      if(this.collectionDaywises.length > 0) {
        this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.collectionDaywises.length }];
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
