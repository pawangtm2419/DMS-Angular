import { Component, OnInit } from '@angular/core';
import { CommonService, DealerReportService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-advance',
  templateUrl: './report-advance.component.html',
  styleUrls: ['./report-advance.component.css']
})
export class ReportAdvanceComponent implements OnInit {

  searchData: any;
  advanceData: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  fromDate: string;
  toDate: string;
  currentDate: any;
  zoleList: any;
  cityList: any;
  selectedCityName: any;
  selectedZone: any;
  data: any = {useType: 'ALL'};
  isExcelDownload: boolean = false;
  constructor(private dealer: DealerReportService, public toaster: ToasterService, private service: CommonService) {
    this.fromDate =  new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0).toISOString();
    this.toDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).toISOString();
  }

  ngOnInit(): void {
    this.getadvReportList();
    this.convertDate();
    this.getZoneList();
  }
  convertDate(): void{
    function pad(s: string | number) { return (s < 10) ? '0' + s : s; }
    const d = new Date();
    this.currentDate = [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  }
  getadvReportList(): void {
    if (this.selectedZone) {
      this.data.zone = this.selectedZone;
    }
    if (this.selectedCityName) {
      this.data.state = this.selectedCityName;
    }
    this.dealer.getAdvReports(this.data).subscribe(res => {
      this.advanceData = res.data;
      if (this.advanceData.length > 0) {
        this.isExcelDownload = true;
        this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.advanceData.length }];
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      this.toaster.showInfo('Data', error);
    });
  }
  dataLimit(): void {
    this.limit = (document.getElementById('limit') as HTMLInputElement).value;
  }

  getZoneList(): void {
    this.service.getZones().subscribe(res => {
      this.zoleList = res.data;
      this.getCityList();
    }, (error) => {
      this.toaster.showInfo('Data', error);
    });
  }

  getCityList(): void {
    this.service.getStatesByZone(this.selectedZone).subscribe(res => {
      this.cityList = res.data;
    }, (error) => {
      this.toaster.showInfo('Data', error);
    });
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "advanceReport.xlsx");
  }
}
