import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';
import { ToasterService } from 'src/app/shared/services/toster.service';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent implements OnInit {
  searchData: any;
  customersData: any;
  customersInfo: any[] = [];
  pageData: number = 1;
  limits: any;
  limit: any = 50;

  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getCustomerList();
  }
  getCustomerList() {
    let data = {useType: "ALL"};
    this.master.getCustomers(data).subscribe(res=> {
      this.customersData=res.data;
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.customersData.length }];
      if(this.customersData.length > 0) {
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showError("Error", error);
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }

  viewFullInfo(customer: any) {
    this.customersInfo = [customer];
    console.log(customer);
  }
  editCustomerIndo(customer: any) {
    console.log(customer);
  }
  deleteCustomerIndo(id: string) {
    console.log(id);
  }
}
