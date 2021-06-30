import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent implements OnInit {
  customersData: any;
  p: number = 1;
  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getCustomerList();
  }
  getCustomerList() {
    let data = {useType: "ALL"};
    this.master.getCustomers(data).subscribe(res=> {
      this.customersData=res.data;
    }, (error) => {
      console.log(error);
    });
  }
  viewFullInfo(customer: any) {
    this.customersData = [customer];
    console.log(customer);
  }
  editCustomerIndo(customer: any) {
    console.log(customer);
  }
  deleteCustomerIndo(id: string) {
    console.log(id);
  }
}
