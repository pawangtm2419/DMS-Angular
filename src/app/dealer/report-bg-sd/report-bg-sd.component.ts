import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-bg-sd',
  templateUrl: './report-bg-sd.component.html',
  styleUrls: ['./report-bg-sd.component.css']
})
export class ReportBgSdComponent implements OnInit {
  searchData: any;
  bgSdData: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  constructor(private dealer: DealerReportService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getadvReportList();
  }
  getadvReportList(): void {
    this.dealer.getBdSdMonitor().subscribe(res => {
      this.bgSdData = res.data;
      if (this.bgSdData.length > 0) {
        this.limits = [{ 'key': 50, 'value': 50 }, { 'key': 100, 'value': 100 }, { 'key': 250, 'value': 250 }, { 'key': 500, 'value': 500 }, { key: 'ALL', value: this.bgSdData.length }];
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      console.log(error);
    });
  }
  dataLimit(): void {
    this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "bgSdReport.xlsx");
  }
}
