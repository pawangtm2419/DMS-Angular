import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';
import { ToasterService } from 'src/app/shared/services/toster.service';

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css']
})
export class CityMasterComponent implements OnInit {
  citiesData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 10;

  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getCityList();
  }
  getCityList() {
    this.master.getCity().subscribe(res=> {
      this.citiesData = res.data;
      this.limits = [{ "key": 10, "value": 10 }, { "key": 25, "value": 25 }, { "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { key: "ALL", value: this.citiesData.length }];
      if(this.citiesData.length > 0) {
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showError("Error", error);
    });
  }

  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }

  cityDelete(id: any) {
    console.log(id);
  }
}

