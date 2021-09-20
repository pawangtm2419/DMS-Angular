import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-old-tractor',
  templateUrl: './report-old-tractor.component.html',
  styleUrls: ['./report-old-tractor.component.css']
})
export class ReportOldTractorComponent implements OnInit {
  searchData:any;
  OldTractData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  isExcelDownload : boolean = false;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getadvReportList()
  }
  getadvReportList() {
    let data = {"startDate":"01-01-2018","endDate":"07-20-2021","useType":"ALL"};
    this.dealer.getOldTractReports(data).subscribe(res=> {
      this.OldTractData=res.result;
      if(this.OldTractData.length > 0) {
        this.isExcelDownload = true;
        this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.OldTractData.length }];
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
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "oldTracktorReport.xlsx");
  }
}
