import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService, UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrls: ['./company-master.component.css']
})
export class CompanyMasterComponent implements OnInit {
  searchData: any;
  isExcelDownload: boolean = false;
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  filterCompanyData: any = [];
  companyData: any;
  companyStatus: boolean = false;
  constructor(private master: MastersService, private toaster: ToasterService, private user: UserService) { }

  ngOnInit(): void {
    this.getCompanyList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getCompanyList() {
    this.master.getCompany().subscribe((res: any) => {
      if(res.status) {
        this.companyData = res.data;
        this.companyStatus = false;
        this.showInActive();
        if(this.companyData.length > 0) {
          this.isExcelDownload = true;
          this.limits.push({ "key": "ALL", value: this.companyData.length });
          this.toaster.showSuccess("Data", "Report successfully Open.");
        } else {
          this.toaster.showInfo("Data", "No record found.");
        }
      } else {
        this.toaster.showError("Data", "No record found.");
      }
    }, (error: any) => {
      this.toaster.showError("Error", error);
    });
  }
  showInActive(): void{
    this.filterCompanyData = this.companyData;
    this.filterCompanyData = this.filterCompanyData.filter((company: any) => {
      return company.isDeleted === this.companyStatus;
    });
    this.companyStatus = !this.companyStatus;
  }
  download(): void {
    console.log('download');
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }

}