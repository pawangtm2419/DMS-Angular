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

  constructor(private route: ActivatedRoute, private service: CommonService, private dealer: DealerService, public toaster: ToasterService) {
    this.route.params.subscribe((params: Params) => {
      this.params = params;
    });
    this.fromDate =  new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0).toISOString();
    this.toDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).toISOString();
  }

  ngOnInit() {
    this.vehicleData();
    this.getTransaction();
    this.getBankCategoryData();
    this.convertDate();
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

  convertDate(): void{
    function pad(s: string | number) { return (s < 10) ? '0' + s : s; }
    const d = new Date();
    this.currentDate = [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
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
  postVehicleDetails(data: any): void {
    const updateData = {
      chassisNo: this.params.id,
      customerId: data.customerId,
      bankId: data.bankId,
      transactionId: data.transactionId,
      advanceAmount: data.advanceAmount,
      advanceDate: data.advanceDate,
      advanceRemarks: data.advanceRemarks
    };
    this.dealer.updateVehicleDetails(updateData).subscribe((res: any) => {
      if(res.status){
        this.vehicleData();
      }
    });
  }
}
