import { Component, OnInit } from '@angular/core';
import { CommonService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ats-delivery',
  templateUrl: './ats-delivery.component.html',
  styleUrls: ['./ats-delivery.component.css']
})
export class AtsDeliveryComponent implements OnInit {
  searchData: any;
  atsDelData: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  data: any = {"type":"PHYSICAL","fromDate":"2020-06-02T00:00:00.000Z","toDate":"2021-08-12T00:00:00.000Z","code":"10003253","state":"Gujarat","zone":"ZONE2","useType":"ALL"}
  constructor(private service: CommonService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getAtsDeliveryList()
  }
  getAtsDeliveryList() {
    this.service.getVehicleDetails(this.data).subscribe(res => {
      this.atsDelData = res.data;
      if (this.atsDelData.length > 0) {
        this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.atsDelData.length }];
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
    XLSX.writeFile(wb, "atsDeliveryReport.xlsx");
  }
}
