import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  isOldTractorReq: any;
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

  constructor(
    private route: ActivatedRoute,
    private service: CommonService,
    private dealer: DealerService,
    public toaster: ToasterService,
    private router: Router
  ) {
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
    if(this.isOldTractorReq === 'yes') {
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

  customerDataByDealer(): void {
    const data = this.vehicleDetails[0].dealer.code;
    this.dealer.getCustomerByDealer(data).subscribe(res => {
      if(res.status){
        this.customerList = res.data;
      }
    });
  }
  postVehicleDetails(): void {
    if(this.dealerPrice < this.oldTractorPrice/2 || this.dealerPrice > this.oldTractorPrice*3) {
      this.toaster.showInfo('Data', 'Invalid Dealer Price');
      return;
    }
    const oldTractorObj = {
      price: (this.isOldTractorReq === 'yes' ? this.oldTractorPrice : '0'),
      make: (this.isOldTractorReq === 'yes' ? this.make : ''),
      model: (this.isOldTractorReq === 'yes' ? this.modelEntry : ''),
    };
    const customerData = {
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
      "balanceAmount": (this.dealerPrice - (this.marginCollected || 0) - (this.isOldTractorReq === 'yes' ? this.oldTractorPrice : 0)),
      "amountReceived": this.marginCollected,
      "amountReceivedDate": this.marginCollectedDate,
      "hasOldTractor": (this.isOldTractorReq === 'Yes' ? 'Yes' : 'No'),
      "oldTractor": oldTractorObj,
      "receivedRemarks": this.remark,
      "paymentType": (this.paymentType === 'finance') ? 'Finance' : 'Cash',
    };
    const history = {
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
      "purchaseType": (this.paymentType === 'finance') ? 'Finance' : 'Cash',
      "paymentType": (this.paymentType === 'finance') ? 'Finance' : 'Cash',
      "customer": customerData,
      "dealer": this.vehicleDetails[0].dealer,
      "createdBy": "EMP0001"
    };
    const dataAPI = {
      action: "ADVANCE",
      lactionType: "ADVANCE",
      chassisNo: this.params.id,
      historyObj: history,
      "paymentObj": {
        "hasOldTractor": (this.isOldTractorReq === 'Yes' ? 'Yes' : 'No'),
        "paymentType": (this.paymentType === 'finance') ? 'Finance' : 'Cash',
        "oldTractor": oldTractorObj,
        "expDisbDate": this.expectedDisbursementDate,
        "amountReceived": this.marginCollected,
        "amountReceivedDate": this.marginCollectedDate,
        "deliveryDate": this.deliveryDate,
        "dealPrice": this.dealerPrice,
        "balanceAmount": (this.dealerPrice - (this.marginCollected || 0) - (this.isOldTractorReq === 'yes' ? this.oldTractorPrice : 0)),
        "transactionNo": this.docReferenceNo,
        "remarks": this.remark,
        customerId: this.customerCode.customerId,
        dealerCode: this.vehicleDetails[0].dealer.code,
        "invoiceNumber": this.vehicleDetails[0].dealer.invoiceNumber,
        "invoiceDate": this.vehicleDetails[0].dealer.invoiceDate,
        "chassisNo": this.params.id
      },
      "customerObj": customerData,
      "finObj": {
        "expLoanSanctionDate": (this.paymentType === 'finance') ? this.loanSanctionDate : '',
        "bankCategory": (this.paymentType === 'finance') ? this.bankCategorySelected : '',
        "bankName": (this.paymentType === 'finance') ? this.bankSelected.instName : '',
        "amount": (this.paymentType === 'finance') ? this.proposedFinanceAmount : ''
      },
      "dealer": this.vehicleDetails[0].dealer,
      "emailId": "shallu.judge@sdfgroup.com"
    }
    this.dealer.updateVehicleDetails(dataAPI).subscribe((res: any) => {
      if(res.status) {
        this.router.navigate(['/ats-delivery']);
      }
    });
  }
}
