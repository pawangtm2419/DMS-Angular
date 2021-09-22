import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MastersService, UserService } from 'src/app/shared/services';
import { ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent implements OnInit {
  searchData: any;
  customersData: any;
  filterCustData: any;
  customersInfo: any[] = [];
  pageData = 1;
  limits = [{ key: '50', value: 50 }, { key: '100', value: 100 }, { key: '250', value: 250 }, { key: '500', value: 500 }];
  limit: any = 50;
  isExcelDownload: boolean = false;
  custStatus: boolean = false;

  constructor(private master: MastersService, private toaster: ToasterService, private user: UserService) { }

  ngOnInit(): void {
    this.getCustomerList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getCustomerList(): void{
    const data = {useType: 'ALL'};
    this.master.getCustomers(data).subscribe((res: any) => {
      if(res.status) {
        this.customersData = res.data;
        if (this.customersData.length > 0) {
          this.isExcelDownload = true;
          this.custStatus = false;
          this.showInActive();
          this.limits.push({ key: 'ALL', value: this.customersData.length });
          this.toaster.showSuccess('Data', 'Report successfully Open.');
        } else {
          this.toaster.showInfo('Data', 'No record found.');
        }
      } else {
        this.toaster.showError('Error', 'No record found.');
      }
    }, (error: any) => {
      this.toaster.showError('Error', error);
    });
  }
  dataLimit(): void{
    this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
  }

  viewFullInfo(customer: any): void{
    this.customersInfo = [customer];
  }
  editCustomerInfo(customer: any): void{
    console.log(customer);
  }
  deleteCustomerIndo(id: string): void{
    const data = {_id: id};
    this.master.deleteCustomer(data).subscribe((res: any) => {
      if (res.status) {
        this.getCustomerList();
        this.toaster.showSuccess('Success', res.msg);
      } else {
        this.toaster.showError('Error', res.msg);
      }
    }),
    (error: any) => {
      this.toaster.showError('Error', error);
    };
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "customerReport.xlsx");
  }

  showInActive(): void{
    this.filterCustData = this.customersData;
    this.filterCustData = this.filterCustData.filter((customer: any) => {
      return customer.isDeleted === this.custStatus;
    });
    this.custStatus = !this.custStatus;
  }
}
