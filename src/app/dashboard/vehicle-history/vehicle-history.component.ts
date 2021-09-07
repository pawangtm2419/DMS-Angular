import { Component, OnInit } from '@angular/core';
import { CommonService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-vehicle-history',
  templateUrl: './vehicle-history.component.html',
  styleUrls: ['./vehicle-history.component.css']
})
export class VehicleHistoryComponent implements OnInit {

  chassisNo: any;
  dataChassisNo: String = '';
  vehiData: any;
  location: String = '';
  constructor(private service: CommonService, public toaster: ToasterService) { }

  ngOnInit(): void { }

  search(): void {
    const data = {
      chassisNo: this.chassisNo
    }
    if (this.chassisNo.length > 13) {
      this.service.vehicleHist(data).subscribe((res: any) => {
        if (res.status) {
          this.vehiData = res.data;
          this.location = res.currentLocation;
          this.dataChassisNo = this.chassisNo;
        } else {
          this.toaster.showInfo('Error', 'Data not found!');
        }
      });
    }
  }
}
