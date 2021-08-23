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
  marginCollected: any;
  expectedDisbursementDate: any;
  docReferenceNo: any;
  proposedFinanceAmount: any;
  remark: any;

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
      price: (this.oldTractor === 'yes' ? this.oldTractorPrice : 0),
      make: (this.oldTractor === 'yes' ? this.make : ''),
      model: (this.oldTractor === 'yes' ? this.modelEntry : ''),
    };
    const dataAPI = {
      action: "ADVANCE",
      lactionType: "ADVANCE",
      chassisNo: this.params.id,
      historyObj: {
        chassisNo: this.params.id,
        engineNo: this.vehicleDetails[0].engineNo,
        code: this.customerCode.customerId,
        status: "RECEIVED",
        "locationType": "CUSTOMER",
        "previousLocType": this.vehicleDetails[0].locationType,
        "previousState": this.vehicleDetails[0].dealer,
        "phone": this.customerCode.mobileNo,
        "state": this.customerCode.address.stateName,
        city: this.customerCode.address.district,
        villageName: this.customerCode.address.villageName,
        tehsil: this.customerCode.address.tehsil,
        "invoiceNumber": this.vehicleDetails[0].dealer.invoiceNumber,
        "invoiceDate": this.deliveryDate,
        "receivedOn": this.deliveryDate,
        "variantCode": this.vehicleDetails[0].variantCode,
        "NDP": this.vehicleDetails[0].NDP,
        "SST": this.vehicleDetails[0].SST,
        "GST": this.vehicleDetails[0].GST,
        "prodDate": this.vehicleDetails[0].prodDate,
        "dealerMargin": this.vehicleDetails[0].dealerMargin,
        "model": this.vehicleDetails[0].model,
        "productCode": this.vehicleDetails[0].productCode,
        "name": this.customerCode.ownerName,
        "purchaseType": this.paymentType,
        "paymentType": this.paymentType,
        "customer": {
          "code": this.customerCode.customerId,
          "phone": this.customerCode.mobileNo,
          "state": this.customerCode.address.stateName,
          city: this.customerCode.address.district,
          tehsil: this.customerCode.address.tehsil,
          "invoiceNumber": this.vehicleDetails[0].dealer.invoiceNumber,
          "invoiceDate": this.deliveryDate,
          "deliveryDate": this.deliveryDate,
          "expDisbDate": this.expectedDisbursementDate,
          "name": this.customerCode.ownerName,
          "dealPrice": this.dealerPrice,
          "balanceAmount": (this.dealerPrice - (this.marginCollected || 0) - (this.oldTractor === 'yes' ? this.oldTractorPrice : 0)),
          "amountReceived": this.marginCollected,
          "amountReceivedDate": this.marginCollectedDate,
          "hasOldTractor": this.oldTractor,
          "oldTractor": oldTractorObj,
          "receivedRemarks": this.remark,
          "paymentType": this.paymentType
        },
        "dealer": this.vehicleDetails[0].dealer,
        "createdBy": "EMP0001"
      },
      "paymentObj": {
        "hasOldTractor": this.oldTractor,
        "paymentType": this.paymentType,
        "oldTractor": oldTractorObj,
        "expDisbDate": this.expectedDisbursementDate,
        "amountReceived": this.marginCollected,
        "amountReceivedDate": this.marginCollectedDate,
        "deliveryDate": this.deliveryDate,
        "dealPrice": this.dealerPrice,
        "balanceAmount": (this.dealerPrice - (this.marginCollected || 0) - (this.oldTractor === 'yes' ? this.oldTractorPrice : 0)),
        "transactionNo": this.docReferenceNo,
        "remarks": this.remark,
        "createdBy": "9515151953",
        customerId: this.customerCode.customerId,
        dealerCode: this.vehicleDetails[0].dealer.code,
        "invoiceNumber": this.vehicleDetails[0].dealer.invoiceNumber,
        "invoiceDate": this.vehicleDetails[0].dealer.invoiceDate,
        "chassisNo": this.params.id
      },
      "customerObj": {
        code: this.customerCode.customerId,
        phone: this.customerCode.mobileNo,
        state: this.customerCode.address.stateName,
        city: this.customerCode.address.district,
        tehsil: this.customerCode.address.tehsil,
        "invoiceNumber": this.vehicleDetails[0].dealer.invoiceNumber,
        "invoiceDate": this.deliveryDate,
        "deliveryDate": this.deliveryDate,
        "expDisbDate": this.expectedDisbursementDate,
        "name": this.customerCode.ownerName,
        "dealPrice": this.dealerPrice,
        "balanceAmount": (this.dealerPrice - (this.marginCollected || 0) - (this.oldTractor === 'yes' ? this.oldTractorPrice : 0)),
        "amountReceived": this.marginCollected,
        "amountReceivedDate": this.marginCollectedDate,
        "hasOldTractor": this.oldTractor,
        "oldTractor": oldTractorObj,
        "receivedRemarks": this.remark,
        "paymentType": this.paymentType
      },
      "finObj": {
        "expLoanSanctionDate": this.loanSanctionDate,
        "bankCategory": this.bankCategorySelected,
        "bankName": this.bankSelected.instName,
        "amount": this.proposedFinanceAmount
      },
      "dealer": this.vehicleDetails[0].dealer,
      "emailId": "shallu.judge@sdfgroup.com"
    }
   this.dealer.updateVehicleDetails(dataAPI).subscribe((res: any) => {
      if(res.status){
        this.vehicleData();
      }
    });
  }
}
