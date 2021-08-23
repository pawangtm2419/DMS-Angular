import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonService, DealerService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-customer-tracking-sheet',
  templateUrl: './customer-tracking-sheet.component.html',
  styleUrls: ['./customer-tracking-sheet.component.css']
})
export class CustomerTrackingSheetComponent implements OnInit {
  date: Date = new Date();
  params!: Params;
  fromDate: string;
  toDate: string;
  currentDate: string;
  marginCollectedDate: any;
  deliveryDate: any;
  vehicleDetails: any;
  bankCategoryList: any;
  transactionList: any;

  constructor(
    private route: ActivatedRoute,
    private service: CommonService,
    private dealer: DealerService,
    public toaster: ToasterService,
    private router: Router
  ) {
    this.route.params.subscribe((params: Params) => { this.params = params;});
    var date = this.date.getDate();
    var month = 1+this.date.getMonth();
    var year = this.date.getFullYear();
    this.fromDate =  year+"-"+(month<9?'0':'')+month+"-"+'01';
    this.toDate = this.currentDate =  year+"-"+(month<9?'0':'')+month+"-"+(date<9?'0':'')+date;
  }

  ngOnInit(): void {
    this.vehicleData();
  }

  vehicleData(): void {
    const data = { chassisNo: this.params.id };
    this.service.getVehicleDetails(data).subscribe(res => {
      if(res.status === "true"){
        this.vehicleDetails = res.data;
        this.getPaymentsList(this.vehicleDetails[0].chassisNo, this.vehicleDetails[0].customer.code, this.vehicleDetails[0].customer.invoiceNumber);
        this.getBankCategoryData();
        this.getTransaction();
      }
    });
  }

  getPaymentsList(chassisNo: any, customerId: any, invoiceNumber: any): void {
    const data = {
      chassisNo: chassisNo,
      customerId: customerId,
      invoiceNumber: invoiceNumber
    };
    this.dealer.getPayments(data).subscribe((res: any) => {
      if(res.status === "true"){
        this.transactionList = res.data[0];
      }
    });
  }

  getBankCategoryData(): void {
    this.service.getBankCategories().subscribe(res => {
      if(res.status === "true"){
        this.bankCategoryList = res.data;
      }
    });
  }

  getTransaction(): void {
    const data = {transactionType: "delivery"};
    this.dealer.getTransactionClose(data).subscribe(res => {
      if(res.status){
        this.transactionList = res.msg;
      }
    });
  }

}
