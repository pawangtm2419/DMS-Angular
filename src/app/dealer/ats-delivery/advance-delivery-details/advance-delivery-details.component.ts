import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonService, DealerService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-advance-delivery-details',
  templateUrl: './advance-delivery-details.component.html',
  styleUrls: ['./advance-delivery-details.component.css']
})
export class AdvanceDeliveryDetailsComponent implements OnInit {
  params!: Params;
  date: Date = new Date();
  vehicleDetails: any;
  transactionList: any;
  bankCategoryList: any;
  fromDate: string;
  toDate: string;
  currentDate!: string;
  customerList: any;
  customerCode: any;
  isCustomerSelect: boolean = false;
  price: any;
  tractorPrice: any;
  dealerPrice: any;
  balancePrice: any;
  paymentType: any;
  paymentTypeSelected: boolean = false;
  bankCategorySelected: any;
  bankDataList: any;
  bankSelected: any;
  loanSanctionDate: any;
  oldTractor: any;
  yesOldTractor: boolean = false;
  oldTractorPrice: any;
  make: any;
  modelEntry: any;
  deliveryDate: any;
  marginCollectedDate: any;

  constructor(private route: ActivatedRoute, private service: CommonService, private dealer: DealerService, public toaster: ToasterService) {
    this.route.params.subscribe((params: Params) => {
      this.params = params;
    });
    var date = this.date.getDate();
    var month = 1+this.date.getMonth();
    var year = this.date.getFullYear();
    this.fromDate =  year+"-"+(month<9?'0':'')+month+"-"+'01';
    this.toDate = this.currentDate =  year+"-"+(month<9?'0':'')+month+"-"+(date<9?'0':'')+date;
    this.marginCollectedDate = this.deliveryDate = this.currentDate;
  }

  ngOnInit() {
    this.vehicleData();
    this.getTransaction();
    this.getBankCategoryData();
  }
  select(): void {
    if(this.customerCode) {
      this.isCustomerSelect = true;
    } else {
      this.isCustomerSelect = false;
    }
  }

  selectPayment() {
    if (this.paymentType === 'finance') {
      this.paymentTypeSelected = true;
    } else {
      this.paymentTypeSelected = false;
    }
  }
  isOldTractor(): void {
    if(this.oldTractor === 'yes') {
      this.yesOldTractor = true;
    } else {
      this.yesOldTractor = false;
    }
  }
  bankListData(): void {
    console.log(this.bankCategorySelected);
    this.dealer.getFinancialInstitutionsList(this.bankCategorySelected).subscribe(res => {
      if(res.status) {
        this.bankDataList = res.data;
      }
    });
  }
  vehicleData(): void {
    const data = { chassisNo: this.params.id };
    this.service.getVehicleDetails(data).subscribe(res => {
      if(res.status === "true"){
        this.vehicleDetails = res.data;
        this.customerDataByDealer();
        if (this.vehicleDetails[0].locationType == "DEALER") {
          this.price = this.vehicleDetails[0].NDP - this.vehicleDetails[0].dealer.discountAmount;
          if(this.vehicleDetails[0].dealer.zone=='ZSAARC') {
            this.tractorPrice = this.price;
          } else {
            this.tractorPrice = this.price + this.price * (this.vehicleDetails[0].GST + this.vehicleDetails[0].SST) / 100;
          }
        } else {
          this.toaster.showInfo('Data', 'No record found.');
        }
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

  getBankCategoryData(): void {
    this.service.getBankCategories().subscribe(res => {
      if(res.status === "true"){
        this.bankCategoryList = res.data;
      }
    });
  }
  // getCustomerByDealer
  customerDataByDealer(): void {
    const data = this.vehicleDetails[0].dealer.code;
    this.dealer.getCustomerByDealer(data).subscribe(res => {
      if(res.status){
        this.customerList = res.data;
      }
    });
  }
  postVehicleDetails(): void {
    const oldTractorObj = {
      price: "15000",
      make: "abc",
      model: "123456"
    };
    const advanceDelivery = {
      chassisNo: this.params.id,
      createdBy: "this.profile.id",
      customerId: this.customerCode.customerId,
      dealerCode: this.vehicleDetails[0].dealer.code,
      invoiceNumber: this.vehicleDetails[0].dealer.invoiceNumber,
      invoiceDate: this.vehicleDetails[0].dealer.invoiceDate,
      hasOldTractor: this.oldTractor,
      paymentType: this.paymentType,
      oldTractor: oldTractorObj,
      expDisbDate: "2021-09-19T00:00:00.000Z",
      amountReceived: "15000",
      amountReceivedDate: "2021-08-20T00:00:00.000Z",
      transactionNo: "fghgfh",
      deliveryDate: "2021-08-20T00:00:00.000Z",
      balanceAmount: 361632,
      dealPrice: "391632",
      remarks: "njhcsnj"
    }
    const historyObj = {
      vehicleId: this.params.id,
    }
    const finObj = {
      bankCategory: "Public-Sector Banks",
      bankName: "State Bank of Hyderabad",
      expLoanSanctionDate: "2021-08-27T00:00:00.000Z",
      amount: "391632"
    };
     const  customerObj = {
      code: this.customerCode.customerId,
      phone: this.customerCode.mobileNo,
      state: this.customerCode.address.stateName,
      city: this.customerCode.address.district,
      tehsil: "Deesa",
      villageName: this.customerCode.address.villageName,
      "invoiceNumber": this.vehicleDetails[0].dealer.invoiceNumber,
      "invoiceDate": this.vehicleDetails[0].dealer.invoiceDate,
      "deliveryDate": this.vehicleDetails[0].dealer.deliveryDate,
      "expDisbDate": this.vehicleDetails[0].dealer.expDisbDate,
      "name": this.customerCode.name,
      "dealPrice": "391632",
      "balanceAmount": 361632,
      "amountReceived": "15000",
      "amountReceivedDate": "2021-08-20T00:00:00.000Z",
      "hasOldTractor": advanceDelivery.hasOldTractor,
      "oldTractor": oldTractorObj,
      "receivedRemarks": advanceDelivery.remarks,
      "paymentType": "Finance"
    };
    this.customerCode['dealPrice'] = this.vehicleDetails[0].dealer.dealPrice;
    this.customerCode['balanceAmount'] = this.vehicleDetails[0].dealer.balanceAmount;
    this.customerCode['amountReceived'] = this.vehicleDetails[0].dealer.amountReceived;
    this.customerCode['amountReceivedDate'] = this.vehicleDetails[0].dealer.amountReceivedDate;
    this.customerCode['hasOldTractor'] = this.vehicleDetails[0].dealer.hasOldTractor;
    this.customerCode['receivedRemarks'] = this.vehicleDetails[0].dealer.receivedRemarks;
    this.customerCode['paymentType'] = this.vehicleDetails[0].dealer.paymentType;
    const data = {
      action: "ADVANCE",
      actionType: "ADVANCE",
      chassisNo: this.params.id,
      historyObj: historyObj,
      paymentObj: advanceDelivery,
      customerObj: customerObj,
      finObj: finObj,
      dealer: this.vehicleDetails[0].dealer,
      emailId: "$scope.profile.email"
  }
    console.log(data);
   /* this.dealer.updateVehicleDetails(data).subscribe((res: any) => {
      if(res.status){
        this.vehicleData();
      }
    }); */
  }
}
