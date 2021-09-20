import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-depot-master',
  templateUrl: './depot-master.component.html',
  styleUrls: ['./depot-master.component.css']
})
export class DepotMasterComponent implements OnInit {
  searchData:any;
  property: any;
  depotData: any;
  filterDepotData: any;
  depotInfo: any[] = [];
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  isExcelDownload: boolean = false;
  depotStatus: boolean= false;

  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getDepotData();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getDepotData() {
    let data = {useType: "ALL"};
    this.master.depotMaster(data).subscribe(res=> {
      this.depotData=res.data;
      if(this.depotData.length > 0) {
        this.showInActive();
        this.isExcelDownload = true;
        this.limits.push({ "key": "ALL", value: this.depotData.length });
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      // this.toaster.showError('Data', error);;
      this.toaster.showInfo("Data", error);
    });
  }

  viewFullInfo(depot: any) {
    this.depotInfo = [depot];
  }
  editCustInfo(depot: any) {
    console.log([depot]);
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
  changeDepotStatus(id: any, status: any) {
    let data = {};
    let areYouSure = false;
    if(status === "Active") {
      areYouSure = true;
      data = { _id : id, depotStatus: 'In Active' };
    } else {
      areYouSure = false;
      data = { _id : id, depotStatus: 'Active' };
    }
    if(areYouSure) {
      this.master.deleteDepot(data).subscribe((res: any)=> {
        if(res.status) {
          this.getDepotData();
          this.toaster.showSuccess("Data", res.msg);
        }
      }, (error) => {
        this.toaster.showError('Data', error);;
      });
    } else {
      this.toaster.showError("Status", "This feature is not availble.");
    }
  }

  showInActive(): void{
    this.filterDepotData = this.depotData;
    this.filterDepotData = this.filterDepotData.filter((depot: any) => {
      return depot.isDeleted === this.depotStatus;
    });
    this.depotStatus = !this.depotStatus;
    // if(this.depotStatus === 'Active') {
    //   this.depotStatus = 'In Active';
    // } else {
    //   this.depotStatus = 'Active';
    // }
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "depotReport.xlsx");
  }

}
