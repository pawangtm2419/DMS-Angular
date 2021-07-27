import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-report-aging-from-production',
  templateUrl: './report-aging-from-production.component.html',
  styleUrls: ['./report-aging-from-production.component.css']
})
export class ReportAgingFromProductionComponent implements OnInit {
  searchData:any;
  ageProdData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getAgingProdList();
  }
  getAgingProdList() {
    let data = {"locationType":"DEALER","type":"production","useType":"ALL"};
    this.dealer.getAgingProd(data).subscribe(res=> {
      this.ageProdData=res.data;
      if(this.ageProdData.length > 0) {
        this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.ageProdData.length }];
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
