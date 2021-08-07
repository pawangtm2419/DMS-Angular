import { Component, OnInit } from '@angular/core';
import { CommonService, DepotService, ToasterService } from 'src/app/shared/services';

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
  selectedChassisNo : string[] = [];
  constructor(private depot: DepotService, public toaster: ToasterService, public service: CommonService) { }

  ngOnInit(): void { }

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
    console.log(this.selectedChassisNo);
  }

  rmItemInvoiceList(selectedChassis: any) {
    this.vehicleList.push(selectedChassis);
    this.selectedChassisNo = this.selectedChassisNo.filter((item: any) => {
      return selectedChassis._id !== item._id;
    });
    console.log(this.selectedChassisNo);
  }

  dataLimit() {
    this.limit = (document.getElementById('limit') as HTMLInputElement).value;
  }

}
