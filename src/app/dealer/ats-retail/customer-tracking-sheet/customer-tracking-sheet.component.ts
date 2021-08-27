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
  userData = JSON.parse(localStorage.getItem('user') || '{}').data;
  fromDate: string;
  toDate: string;
  currentDate: string;
  marginCollectedDate: any;
  deliveryDate: any;
  vehicleDetails: any;
  bankCategoryList: any;
  transactionList: any;
  selectPaymentType: any = "Finance";
  selectPaymentInstitution: any = '';
  bankDataList: any;
  selectPaymentInstitutionName: any;
  referanceNo: any;
  amountRecived: any;
  paymentRemark: any;
  amountReceivedDate: any;
  paymentsList: any;
  retailDate: any;
  amtReceived: any;

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
    this.retailDate = this.toDate = this.currentDate =  year+"-"+(month<9?'0':'')+month+"-"+(date<9?'0':'')+date;
  }

  ngOnInit(): void {
    this.vehicleData();
    this.getTransaction();
  }

  vehicleData(): void {
    const data = { chassisNo: this.params.id };
    this.service.getVehicleDetails(data).subscribe(res => {
      if(res.status === "true"){
        this.vehicleDetails = res.data;
        /* if (this.vehicleDetails.isRetailed === false) {
          this.amtReceived = this.vehicleDetails.customer.dealPrice - this.vehicleDetails.customer.balanceAmount;
        } else {
          this.toaster.showInfo("Info", "This is a retail vehicle");
          setTimeout(() => {
            this.router.navigate(['/ats-retail']);
          }, 3000);
        } */
        this.getPaymentsList(this.vehicleDetails[0].chassisNo, this.vehicleDetails[0].customer.code, this.vehicleDetails[0].customer.invoiceNumber);
        this.getBankCategoryData();
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
        this.paymentsList = res.data;
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

  getBankList(): void {
    this.dealer.getFinancialInstitutionsList(this.selectPaymentInstitution).subscribe(res => {
      if(res.status) {
        this.bankDataList = res.data;
      }
    });
  }

  postPaymentData(): void {
    const data = {
      "action": "UPDATE",
      "actionType": "CUSTOMERPAYMENT",
      "chassisNo": this.vehicleDetails[0].chassisNo,
      "paymentObj": {
        "paymentMode": "Cash",
        "chassisNo": this.vehicleDetails[0].chassisNo,
        "dealerCode": this.vehicleDetails[0].dealer.code,
        "customerId": this.vehicleDetails[0].customer.code,
        "dealPrice": this.vehicleDetails[0].customer.dealPrice,
        "invoiceNumber": this.vehicleDetails[0].customer.invoiceNumber,
        "amountReceivedDate": this.amountReceivedDate,
        "createdBy": this.userData.empID,
        "paymentType": this.selectPaymentType,
        "financeDetails": {
          "bankCategory": this.selectPaymentInstitution,
          "bankName": this.selectPaymentInstitutionName,
        },
        "transactionNo": this.referanceNo,
        "amountReceived": this.amountRecived,
        "remarks": this.paymentRemark,
        "balanceAmount": (this.vehicleDetails[0].customer.dealPrice - this.amountRecived)
      }
    };
    this.dealer.savePayment(data).subscribe((res: any) => {
      if(res.status) {
        this.ngOnInit();
        this.toaster.showSuccess("Success" , res.message);
      }
    });
  }
  getRetailSave(): void {
    if(this.paymentsList.length > 0) {
     for(let i = 0; i< this.paymentsList.length; i++) {
       this.retailDate = this.paymentsList[i].amountReceivedDate;
     }
    }
    const data = {
      "chassisNo": this.vehicleDetails[0].chassisNo,
      "retailDate": this.retailDate,
      "createdBy": this.userData.empID,
      "emailId": this.userData.email
    };
    this.dealer.saveRetail(data).subscribe((res: any) => {
      if(res.status) {
        this.toaster.showSuccess("Success" , res.message);
        setTimeout(() => {
          this.router.navigate(['/ats-retail']);
        }, 3000);
      }
    });
  }
}
