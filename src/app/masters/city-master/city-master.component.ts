import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css']
})
export class CityMasterComponent implements OnInit {
  searchData:any;
  citiesData: any;
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  isExcelDownload: boolean = false;
  filterCityData: any;
  cityStatus: boolean= true;
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getCityList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getCityList() {
    this.master.getCity().subscribe(res=> {
      this.citiesData = res.data;
      this.cityStatus = true;
      this.showInActive();
      if(this.citiesData.length > 0) {
        this.isExcelDownload = true;
        this.limits.push({ "key": "ALL", value: this.citiesData.length });
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

  cityDelete(id: any, sts: any) {
    const data = {
      "id": id,
      "status": sts
    }
    var areYouSure = false;
    if(data.status) {
      areYouSure = true;
    } else {
      areYouSure = false;
    }
    if(areYouSure) {
      this.master.deactiveCity(data).subscribe((res: any)=> {
        if(res.status) {
          this.toaster.showSuccess("Success", res.msg);
          this.getCityList();
        } else {
          this.toaster.showError("Error", res.msg);
        }
      }), (error: any) => {
        this.toaster.showError("Error", error);
      }
    } else {
      this.toaster.showError("Status", "This feature is not availble.");
    }
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "citiesReport.xlsx");
  }
  showInActive(): void{
    this.filterCityData = this.citiesData;
    this.filterCityData = this.filterCityData.filter((city: any) => {
      return city.isActive === this.cityStatus;
    });
    this.cityStatus = !this.cityStatus;
  }
}

