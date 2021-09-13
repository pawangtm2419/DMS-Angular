import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-zone-master',
  templateUrl: './zone-master.component.html',
  styleUrls: ['./zone-master.component.css']
})
export class ZoneMasterComponent implements OnInit {
  searchData:any;
  zonesData: any;
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  isExcelDownload: boolean = false;
  filterZoneData: any;
  zoneStatus: boolean = true;
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getzoneList();
  }
  getzoneList() {
    this.master.getzones().subscribe(res=> {
      this.zonesData=res.zones;
      this.showInActive();
      if(this.zonesData.length > 0) {
        this.isExcelDownload = true;
        this.zoneStatus = true;
        this.showInActive();
        this.limits.push({ "key": "ALL", value: this.zonesData.length });
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showError('Data', error);;
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
  zoneDelete(code: String) {
    console.log(code);
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "zoneReport.xlsx");
  }
  showInActive(): void{
    this.filterZoneData = this.zonesData;
    this.filterZoneData = this.filterZoneData.filter((state: any) => {
      return state.status === this.zoneStatus;
    });
    this.zoneStatus = !this.zoneStatus;
  }
}
