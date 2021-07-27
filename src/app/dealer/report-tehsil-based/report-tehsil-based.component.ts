import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-report-tehsil-based',
  templateUrl: './report-tehsil-based.component.html',
  styleUrls: ['./report-tehsil-based.component.css']
})
export class ReportTehsilBasedComponent implements OnInit {
  searchData:any;
  tehsilData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  year: Number = new Date().getFullYear();
  month: Number = new Date().getMonth()+1;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.gettehsilReportList();
  }
  gettehsilReportList() {
    let data = {"year": this.year,"month": this.month,"useType":"ALL"};
    this.dealer.getTehsilReports(data).subscribe(res=> {
      this.tehsilData=res.result;
      if(this.tehsilData.length > 0) {
        this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.tehsilData.length }];
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
