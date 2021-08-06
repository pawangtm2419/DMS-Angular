import { Component, OnInit } from '@angular/core';
import { CommonService, DepotService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-generate-transfer-note',
  templateUrl: './generate-transfer-note.component.html',
  styleUrls: ['./generate-transfer-note.component.css']
})
export class GenerateTransferNoteComponent implements OnInit {
  depotList: any;
  depotCode: any = '';
  selectedToLocDepotName: any = '';
  selectedToLocation: any = '';
  selectedToDepotName: any = '';
  selectedtransport: any = '';
  selectedDriverName: any = '';
  selectedTransportName: any = '';
  stateName: any;
  selectedState: any = '';
  transportList: any;
  driverList: any;
  toLocation = ['dealer', 'depot'];
  transport = [ 'truck', 'road' ];
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


  getStateList() {
    if (this.selectedToLocation === 'dealer') {
      this.depot.getState().subscribe(res => {
        this.stateName = res.data;
        if (this.stateName.length > 0) {
          console.log(this.stateName);
        } else {
          this.toaster.showInfo('Data', 'No record found.');
        }
      }, (error) => {
        this.toaster.showError('Error', error);
      });
    }
  }

  getTransportList() {
    if (this.selectedtransport === 'truck') {
      this.depot.getTransport().subscribe(res => {
        this.transportList = res.data;
        if (this.transportList.length > 0) {
          console.log(this.transportList);
        } else {
          this.toaster.showInfo('Data', 'No record found.');
        }
      }, (error) => {
        this.toaster.showError('Error', error);
      });
    }
  }

  getDriverList() {
    if (this.selectedtransport === 'truck') {
      this.depot.getDriver().subscribe(res => {
        this.driverList = res.data;
        if (this.driverList.length > 0) {
          console.log(this.driverList);
        } else {
          this.toaster.showInfo('Data', 'No record found.');
        }
      }, (error) => {
        this.toaster.showError('Error', error);
      });
    }
  }


}
