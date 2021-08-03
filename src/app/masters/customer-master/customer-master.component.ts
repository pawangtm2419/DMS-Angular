import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services';
import { ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent implements OnInit {
  searchData: any;
  customersData: any;
  customersInfo: any[] = [];
  pageData = 1;
  limits = [{ key: '50', value: 50 }, { key: '100', value: 100 }, { key: '250', value: 250 }, { key: '500', value: 500 }];
  limit: any = 50;

  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getCustomerList();
  }
  getCustomerList(): void{
    const data = {useType: 'ALL'};
    this.master.getCustomers(data).subscribe(res => {
      this.customersData = res.data;
      this.limits.push({ key: 'ALL', value: this.customersData.length });
      if (this.customersData.length > 0) {
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      this.toaster.showError('Error', error);
    });
  }
  dataLimit(): void{
    this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
  }

  viewFullInfo(customer: any): void{
    this.customersInfo = [customer];
  }
  editCustomerIndo(customer: any): void{
    console.log(customer);
  }
  deleteCustomerIndo(id: string): void{
    console.log(id);
  }
}
