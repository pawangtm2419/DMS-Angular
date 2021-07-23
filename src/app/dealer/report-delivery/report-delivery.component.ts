import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-report-delivery',
  templateUrl: './report-delivery.component.html',
  styleUrls: ['./report-delivery.component.css']
})
export class ReportDeliveryComponent implements OnInit {

  searchData:any;
  deliveryData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;

  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getdelList();
  }
  getdelList() {
    let data = {"fromDate":"2021-06-01T00:00:00.000Z","toDate":"2021-07-20T00:00:00.000Z","useType":"ALL"};
    this.dealer.getDelReports(data).subscribe(res=> {
      this.deliveryData=res.data;
      console.log(this.deliveryData);
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.deliveryData.length }];
      if(this.deliveryData.length > 0) {
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      // console.log(error);
      this.toaster.showInfo("Data", error);
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
}
