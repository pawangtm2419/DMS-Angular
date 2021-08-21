import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-variant-master',
  templateUrl: './variant-master.component.html',
  styleUrls: ['./variant-master.component.css']
})
export class VariantMasterComponent implements OnInit {
  searchData:any;
  variantData: any;
  variantInfo: any[] = [];
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  isExcelDownload: boolean = false;
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getVariantList();
  }
  getVariantList() {
    this.master.getVariant().subscribe(res=> {
      this.variantData=res.data;
      if(this.variantData.length > 0) {
        this.isExcelDownload = true;
        this.limits.push({ "key": "ALL", value: this.variantData.length });
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      console.log(error);
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
  viewFullInfo(variant: any) {
    this.variantInfo = [variant];
  }
  variantDelete(code: String) {
    console.log(code);
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "variantReport.xlsx");
  }
}
