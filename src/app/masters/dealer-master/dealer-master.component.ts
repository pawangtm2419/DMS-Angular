import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-dealer-master',
  templateUrl: './dealer-master.component.html',
  styleUrls: ['./dealer-master.component.css']
})
export class DealerMasterComponent implements OnInit {
  searchData: any;
  dealerData: any;
  dealerInfo: any[] = [];
  title = "Dealer Master";
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  currentdate= new Date();
  isExcelDownload:boolean = false;
  dealerDeleteId: any;
  filterDealerData: any;
  dealerStatus: string = 'Active';
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getDealersList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getDealersList() {
    let data = {useType: "ALL"};
    this.master.getDealers(data).subscribe((res: any)=> {
      this.dealerData = res.msg;
      if(this.dealerData.length > 0) {
        this.showInActive();
        this.isExcelDownload = true;
        this.limits.push({ "key": "ALL", value: this.dealerData.length });
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showError('Data', error);;
    });
  }
  sureDelete(id: any): void {
    this.dealerDeleteId = id;
    console.log(this.dealerDeleteId);
  }
  dealerStatusModal(): void {
    const data = {
      "dealerStatus":"In Active",
      "_id": this.dealerDeleteId
    };
    this.master.changeDealerStatus(data).subscribe((res: any) => {
      if(res.status == 'true') {
        this.toaster.showSuccess("Data", "Status successfully changed.");
        this.getDealersList();
      } else {
        this.toaster.showError("Data", "Status not changed.");
      }
    }), (error: any) => {
      this.toaster.showError("Data", error);
    }
  }
  editDealerInfo(dealer: any) {
    console.log([dealer]);
  }
  showInActive(): void{
    this.filterDealerData = this.dealerData;
    this.filterDealerData = this.filterDealerData.filter((dealer: any) => {
      return dealer.dealerStatus === this.dealerStatus;
    });
    if(this.dealerStatus === 'Active') {
      this.dealerStatus = 'In Active';
    } else {
      this.dealerStatus = 'Active';
    }
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
  viewFullInfo(dealer: any) {
    this.dealerInfo = [dealer];
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "dealerReport.xlsx");
  }

}
