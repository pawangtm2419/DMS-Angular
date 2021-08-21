import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.css']
})
export class RoleMasterComponent implements OnInit {
  searchData:any;
  rolesData: any;
  rolesInfo: any[] = [];
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  isExcelDownload:boolean = false;
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getRolessList();
  }
  getRolessList() {
    this.master.getRoles().subscribe(res=> {
      this.rolesData=res.data;
      if(this.rolesData.length > 0) {
        this.isExcelDownload = true;
        this.limits.push({ "key": "ALL", value: this.rolesData.length });
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      console.log(error);
    });
  }
  viewFullInfo(role: any) {
    this.rolesInfo = [role];
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }

  roleDelete(code: String) {
    console.log(code);
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "roleReport.xlsx");
  }
}
