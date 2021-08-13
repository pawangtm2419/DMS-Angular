import { Component, OnInit } from '@angular/core';
import { DealerService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ats-insurance',
  templateUrl: './ats-insurance.component.html',
  styleUrls: ['./ats-insurance.component.css']
})
export class AtsInsuranceComponent implements OnInit {
  searchData: any;
  InsuranceData: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  data: any = {"zoneCode":"ZONE2","stateName":"Maharashtra","dealerCode":"10003174","fromDate":"2018-12-04T00:00:00.000Z","toDate":"2021-08-12T00:00:00.000Z","useType":"ALL"}

  constructor(private dealer: DealerService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getAtsInsuList()
  }
  getAtsInsuList() {
    this.dealer.getvehInsurance(this.data).subscribe(res => {
      this.InsuranceData = res.data;
      console.log(this.InsuranceData);
      if (this.InsuranceData.length > 0) {
        this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.InsuranceData.length }];
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
    XLSX.writeFile(wb, "atsInsuranceReport.xlsx");
  }
}
