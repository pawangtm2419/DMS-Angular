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
  filterVarData: any;
  variantStatus: boolean = false;
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getVariantList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getVariantList() {
    this.master.getVariant().subscribe((res: any)=> {
      this.variantData=res.data;
      this.variantStatus = false;
      this.showInActive();
      if(this.variantData.length > 0) {
        this.isExcelDownload = true;
        this.limits.push({ "key": "ALL", value: this.variantData.length });
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error: any) => {
      this.toaster.showError('Data', error);;
    });
  }
  editVarInfo(variant: any) {
    console.log([variant]);
  }

  changeVariantStatus(){

  }
  showInActive(): void{
    this.filterVarData = this.variantData;
    this.filterVarData = this.filterVarData.filter((variant: any) => {
      return variant.isDeleted === this.variantStatus;
    });
    this.variantStatus = !this.variantStatus;
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
