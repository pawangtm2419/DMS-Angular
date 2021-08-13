import { Component, OnInit } from '@angular/core';
import { CommonService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ats-retail',
  templateUrl: './ats-retail.component.html',
  styleUrls: ['./ats-retail.component.css']
})
export class AtsRetailComponent implements OnInit {
  searchData: any;
  retailData: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  data: any = {"type":"ADVANCE","fromDate":"2020-05-07T00:00:00.000Z","toDate":"2021-08-12T00:00:00.000Z","code":"10003151","state":"Maharashtra","zone":"ZONE2","useType":"ALL"}
  constructor(private service: CommonService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getAtsRetailList();
  }
  getAtsRetailList() {
    this.service.getVehicleDetails(this.data).subscribe(res => {
      this.retailData = res.data;
      if (this.retailData.length > 0) {
        this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.retailData.length }];
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      this.toaster.showInfo('Data', error);
    });
  }
  dataLimit() {
    this.limit = (document.getElementById('limit') as HTMLInputElement).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "atsRetailReport.xlsx");
  }
}
