import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DealerReportService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-dealer-collection-mtd',
  templateUrl: './report-dealer-collection-mtd.component.html',
  styleUrls: ['./report-dealer-collection-mtd.component.css']
})
export class ReportDealerCollectionMTDComponent implements OnInit {

  searchData: any;
  collectionMtds: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;
  isExcelDownload: boolean = false;

  constructor(private dealer: DealerReportService, public toaster: ToasterService, private route: Router) { }

  ngOnInit(): void {
    this.getCollectionList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getCollectionList(): void {
    const data = {year: this.year, month: this.month, useType: 'ALL'};
    this.dealer.getCollectionMtd(data).subscribe((res: any) => {
      this.collectionMtds = res.data;
      this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.collectionMtds.length }];
      if (this.collectionMtds.length > 0) {
        this.isExcelDownload = true;
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      this.toaster.showInfo('Data', error);
    });
  }

  getStatewiseCollection(state: any): void {
    const date = new Date();
    localStorage.setItem("currentState", JSON.stringify(state));
    localStorage.setItem("currentMonth", JSON.stringify(this.month));
    localStorage.setItem("currentYear", JSON.stringify(this.year));
    this.route.navigate(['/r-dealer-collection-statewise']);
  }

  dataLimit(): void {
    this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "dealerCollectionMTDReport.xlsx");
  }
}
