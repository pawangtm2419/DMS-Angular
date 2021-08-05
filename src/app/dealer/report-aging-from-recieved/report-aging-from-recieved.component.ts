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
  total: any;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getAgingProdList();
  }
  getAgingProdList() {
    let data = {"locationType":"DEALER","useType":"ALL"};
    this.dealer.getAgingRec(data).subscribe(res=> {
      this.ageRecData=res.data;
      console.log(this.ageRecData);
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.ageRecData.length }];
      if(this.ageRecData.length > 0) {
        this.total ={
          count30: 0, count3060: 0, count6090: 0, count90120: 0, count120180: 0, count180: 0, count: 0
        }
        this.ageRecData.forEach((item: { count30: any; count3060:any, count6090:any; count90120: any; count120180: any; count180:any; count: any;}) => {
          this.total.count30 = this.total.count30 + item.count30;
          this.total.count3060 = this.total.count3060 + item.count3060;
          this.total.count6090 = this.total.count6090 + item.count6090;
          this.total.count90120 = this.total.count90120 + item.count90120;
          this.total.count120180 = this.total.count120180 + item.count120180;
          this.total.count180 = this.total.count180 + item.count180;
          this.total.count = this.total.count + item.count;
          console.log(item.count)
        });
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
