import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-report-dealer-collection-mtd',
  templateUrl: './report-dealer-collection-mtd.component.html',
  styleUrls: ['./report-dealer-collection-mtd.component.css']
})
export class ReportDealerCollectionMTDComponent implements OnInit {

  searchData:any;
  collectionMtds: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  year: Number = new Date().getFullYear();
  month: Number = new Date().getMonth()+1;

  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getCollectionList();
  }
  getCollectionList() {
    let data = {"year":this.year,"month":this.month,"useType":"ALL"};
    this.dealer.getCollectionMtd(data).subscribe(res=> {
      this.collectionMtds=res.data;
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.collectionMtds.length }];
      if(this.collectionMtds.length > 0) {
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
