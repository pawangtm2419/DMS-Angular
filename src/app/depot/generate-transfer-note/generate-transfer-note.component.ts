import { Component, OnInit } from '@angular/core';
import { CommonService, DepotService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

interface InvoiceObject {
  [key: string]: any
}

@Component({
  selector: 'app-generate-transfer-note',
  templateUrl: './generate-transfer-note.component.html',
  styleUrls: ['./generate-transfer-note.component.css']
})
export class GenerateTransferNoteComponent implements OnInit {
  depotList: any;
  vehicleList: any;
  toDepotlist: any;
  searchData: any;
  searchItem: any;
  pageData = 1;
  limits: any = [{ key: 50, value: 50 }];
  limit: any = 50;
  selectedToLocDepotName: any = '';
  selectedToLocation: any = '';
  selectedToDepot: any = '';
  selectedTransport: any = '';
  selectedTransportName: any = '';
  selectedDriverName: any = '';
  toLocation = ['dealer', 'depot'];
  transport = [ 'truck', 'road' ];
  selectedChassisNo : InvoiceObject = {};
  dealerStateList: string[] = [];
  resultInvoice: string[] = [];
  driverNameList: any;
  transportList: any;
  invoiceNumber: any;
  grNumber: any;
  invoiceDate: any;
  currentDate: any;
  vehicletransportdriverSelected: boolean = false;
  genrateRetailNote: boolean = false;
  transportData: any;
  driverData: any;
  selectedDealerState: any;
  selectedDealer: any;
  selectedDealerData: any;
  isDiscountAmount: boolean = false;
  dollar: any;
  isDollerCheckBox: boolean = false;
  dollarvalue: any;
  constructor(private depot: DepotService, public toaster: ToasterService, public service: CommonService) { }

  ngOnInit(): void { 
    this.checkInvoiceNo();
  }
  convertDate(): void{
    function pad(s: string | number) { return (s < 10) ? '0' + s : s; }
    const d = new Date();
    this.currentDate = [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  }
  showDollar(): void {
    this.isDollerCheckBox = !this.isDollerCheckBox;
  }
  selectionTransport(data: any) {
    this.transportData = this.transportList.filter( (item: any) => {
      return item.transName === data;
    });
    this.transportData = this.transportData[0];
  }
  selectionDriverName(data: any) {
    this.driverData = this.driverNameList.filter( (item: any) => {
      return item.driverName === data;
    });
    this.driverData = this.driverData[0];
  }
  dealerDataArray(obj: any): void {
    this.selectedDealerData = this.toDepotlist.filter( (item: any) => {
      return item.code === obj;
    });
    this.selectedDealerData = this.selectedDealerData[0];
    console.log(this.selectedDealerData);
  }
  getCityList() {
    this.service.viewDepot().subscribe(res => {
      this.depotList = res.data;
      if (this.depotList.length > 0) {
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      this.toaster.showError('Error', error);
    });
  }

  gettoDtpotList() {
    this.toDepotlist = this.depotList.filter( (item: any) => {
      return item.depotCode !== this.selectedToLocDepotName;
    });
  }

  getVehicleList() {
    const data = {
      'locationCode': this.selectedToLocDepotName,
      'locationType': this.selectedToLocation.toUpperCase()
    }
    if (data.locationCode === 'WAREHOUSE') {
      data.locationType = 'PLANT';
    }
    if (data.locationCode && data.locationType) {
      this.depot.viewVehicle(data).subscribe((res) => {
        this.vehicleList = res.data;
        this.selectedChassisNo = [];
        if (this.vehicleList.length > 0) {
          this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.vehicleList.length }];
          this.toaster.showSuccess('Data', 'Data report open.');
        } else {
          this.toaster.showInfo('Data', 'No record found.');
        }
      }, (error) => {
        this.toaster.showError('Error', error);
      });
    }
  }

  generateInvoiceList(selectedChassis: any) {
    this.selectedChassisNo.push(selectedChassis);
    this.vehicleList = this.vehicleList.filter((item: any) => {
      return selectedChassis._id !== item._id;
    });
  }

  rmItemInvoiceList(selectedChassis: any) {
    this.vehicleList.push(selectedChassis);
    this.selectedChassisNo = this.selectedChassisNo.filter((item: any) => {
      return selectedChassis._id !== item._id;
    });
  }

  getDriverList() {
    this.service.getDriver().subscribe(res => {
      this.driverNameList = res.data;
    }, (error) => {
      this.toaster.showError('Error', error);
    });
  }

  getTransportList() {
    this.service.getTransport().subscribe(res => {
      this.transportList = res.data;
    }, (error) => {
      this.toaster.showError('Error', error);
    });
  }

  invoiceGenrate(): void {
    this.convertDate();
    this.vehicletransportdriverSelected = true;
    console.log(this.selectedChassisNo);
  }

  getDealerStatesList(): void {
    this.service.getState().subscribe((res: any) => {
      this.dealerStateList = res.data;
    });
  }

  getDealerListData(): void {
    this.service.getDealerList(this.selectedDealerState).subscribe((res: any) => {
      this.toDepotlist = res.msg;
    });
  }
  genratesrn(): void {
    var invo = this.resultInvoice.filter((obj) => {
      return obj == this.invoiceNumber;
    });
    if (invo.length > 0) {
      this.toaster.showError('Error', "Invoice Number already exists.");
    } else {
      if(this.vehicletransportdriverSelected) {
        const invoiceData = {
          "action": "UPDATE",
          "actionType": "STN",
          "code": "",
          "name": "",
          "city": "",
          "state": "",
          "zone": "",
          "head": "",
          "email": "",
          "mobile": "",
          "status": "READY",
          "PDIstatus": false,
          "damageControlStatus": false,
          "transport": {},
          "grNo": "",
          "invoiceNumber": "",
          "invoiceDate": "",
          "vehicles": this.selectedChassisNo,
          "createdBy": "EMP0001",
          "locationType": ""
        }
        if(this.selectedToLocation === 'depot') {
          invoiceData.locationType = "DEPOT";
        } else {
          invoiceData.locationType = "DEALER";
        }
        if(this.selectedToDepot && invoiceData.locationType === "DEPOT") {
          invoiceData.code = this.selectedToDepot.depotCode;
          invoiceData.name = this.selectedToDepot.depotName;
          invoiceData.state = this.selectedToDepot.address.stateName;
          invoiceData.city = this.selectedToDepot.address.cityName;
          invoiceData.zone = this.selectedToDepot.address.zoneName;
          invoiceData.head = this.selectedToDepot.depotHead.name;
          invoiceData.email = this.selectedToDepot.depotHead.email;
          invoiceData.mobile = this.selectedToDepot.depotHead.mobile;
        }
        debugger;
        if(this.selectedDealerData && invoiceData.locationType === "DEALER") {
          invoiceData.code = this.selectedDealerData.code;
          invoiceData.name = this.selectedDealerData.name;
          invoiceData.state = this.selectedDealerData.stateName;
          invoiceData.city = this.selectedDealerData.cityName;
          invoiceData.zone = this.selectedDealerData.zone;
          invoiceData.head = this.selectedDealerData.dealerHead;
          invoiceData.email = this.selectedDealerData.email;
          invoiceData.mobile = this.selectedDealerData.mobile;
        }
        if(this.selectedTransport === 'truck') {
          const trans = {
            "type": "TRUCK",
            "code": this.transportData.transCode,
            "name": this.transportData.transName
          }
          invoiceData.transport = trans;
        } else {
          const trans = {
            "type": "ROAD",
            "code": this.driverData.driverCode,
            "name": this.driverData.driverName
          }
          invoiceData.transport = trans;
        }
        this.invoiceDate = (document.getElementById('invoiceDate') as HTMLInputElement).value;        
        if(this.invoiceNumber && this.invoiceDate) {
          invoiceData.invoiceNumber = this.invoiceNumber;
          invoiceData.invoiceDate = this.invoiceDate + 'T00:00:00.000Z';
          this.genrateRetailNote = true;
        } else {
          this.toaster.showError('Error', "Invoice Number and Date.");
        }
        if(this.grNumber) {
          invoiceData.grNo = this.grNumber;
        }
        if(this.isDiscountAmount || this.selectedToLocation === 'depot') {
          if(this.genrateRetailNote) {
            this.depot.updateVehicleDetails(invoiceData).subscribe((res: any) => {
              if(res.status) {
                this.toaster.showSuccess('Success', res.msg.msg);
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }
            }), (error: any) => {
              this.toaster.showError('Error', error);
            }
          }
        } else {
          this.toaster.showError('Error', "Please correct discount amount.");
        }
      } else {
        this.toaster.showError('Error', "Please select all details.");
      }
    }
  }

  checkInvoiceNo(): void {
    const data = { loctype: 'DEALER' };
    this.depot.checkInvoiceNumber(data).subscribe((res: any) => {
      if(res.status) {
        if (res.data.length > 0) {
          var d = res.data.map((inv: any) => {
            if (inv.invoiceNumbers.length > 0) {
              var dat = inv.invoiceNumbers.map( (numbers: any) => {
                this.resultInvoice.push(numbers);
              })
            }
          })
        }
      }
    });
  }
  discountCheck(discountAmount: any, stock: any, i: any): void {
    if(!discountAmount) {
      discountAmount = 0;
    }
    var tax = 0;
    var state = stock.plant.state;
    const invoiceAmount = stock.NDP - discountAmount;
    if (stock.locationType == "DEPOT") {
      state = stock.depot.state;
    }
    if (this.selectedDealerData.zone === "ZSAARC") {
      this.selectedChassisNo[i]['invoiceAmount'] = invoiceAmount;
      if (this.isDollerCheckBox && this.dollarvalue > 0) {
        this.selectedChassisNo[i]['invoiceAmount'] = (invoiceAmount / this.dollarvalue).toFixed(2);
      }
    } else {
      tax = ((stock.SST) + (stock.GST)) / 100;
      const pricet = invoiceAmount * tax;
      this.selectedChassisNo[i]['invoiceAmount'] = (pricet + invoiceAmount).toFixed(2);
  }
    console.log(this.selectedChassisNo);
  }

  checkAmount(discountAmount: any, NDP: any): void {
    if(discountAmount > NDP || discountAmount < 0) {
      this.isDiscountAmount = false;
      this.toaster.showError('Error', "Please correct discount amount.");
    }
    this.isDiscountAmount = true;
  }
  dataLimit() {
    this.limit = (document.getElementById('limit') as HTMLInputElement).value;
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "grStockNoteReport.xlsx");
  }
}