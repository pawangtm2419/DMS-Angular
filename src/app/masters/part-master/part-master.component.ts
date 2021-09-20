import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-part-master',
  templateUrl: './part-master.component.html',
  styleUrls: ['./part-master.component.css']
})
export class PartMasterComponent implements OnInit {
  searchData: any;
  partsData: any;
  partsInfo: any[] = [];
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  isExcelDownload: boolean = false;
  filterPartsData: any;
  partStatus: boolean = false;
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getPartList();
  }

  getPartList() {
    this.master.getParts().subscribe(res=> {
      this.partsData=res.data;
      this.showInActive();
      if(this.partsData.length > 0) {
        this.isExcelDownload = true;
        this.limits.push({ "key": "ALL", value: this.partsData.length });
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showError('Data', error);;
    });
  }
  showInActive(): void{
    this.filterPartsData = this.partsData;
    this.filterPartsData = this.filterPartsData.filter((part: any) => {
      return part.isDeleted === this.partStatus;
    });
    this.partStatus = !this.partStatus;
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
  viewFullInfo(part: any) {
    this.partsInfo = [part];
  }
  partDelete(code: String) {
    console.log(code);
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "partReport.xlsx");
  }
}
