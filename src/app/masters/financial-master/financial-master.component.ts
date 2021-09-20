import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-financial-master',
  templateUrl: './financial-master.component.html',
  styleUrls: ['./financial-master.component.css']
})
export class FinancialMasterComponent implements OnInit {
  searchData:any;
  financialInstsData: any;
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  isExcelDownload: boolean = false;
  filterfinanceData: any;
  financeStatus: boolean = false;
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getFinancialInst();
  }
  refresh(): void {
    this.ngOnInit();
  }

  getFinancialInst() {
    this.master.getFinancialInst().subscribe((res: any) => {
      this.financialInstsData=res.data;
      this.financeStatus = false;
      this.showInActive();
      if(this.financialInstsData.length > 0) {
        this.isExcelDownload = true;
        this.limits.push({ "key": "ALL", value: this.financialInstsData.length });
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error: any) => {
      this.toaster.showError('Data', error);;
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }

  financeDelete(code: String) {
    console.log(code);
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "financialReport.xlsx");
  }
  showInActive(): void{
    this.filterfinanceData = this.financialInstsData;
    this.filterfinanceData = this.filterfinanceData.filter((finance: any) => {
      return finance.isDeleted === this.financeStatus;
    });
    this.financeStatus = !this.financeStatus;
  }
}
