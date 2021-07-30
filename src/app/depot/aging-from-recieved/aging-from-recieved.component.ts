import { Component, OnInit } from '@angular/core';
import { CommonService, DepotService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-aging-from-recieved',
  templateUrl: './aging-from-recieved.component.html',
  styleUrls: ['./aging-from-recieved.component.css']
})
export class AgingFromRecievedComponent implements OnInit {
  searchData:any;
  ageRecData: any;
  pageData: number = 1;
  limits: any;
  limit: any = 50;
  variantList: any;
  selectedVariantName: any;
  selectedModelName: any;
  modelList: any;
  data: any = {"locationType":"DEPOT","useType":"ALL"};
  total: any = { count30: 0, count3060: 0, count6090: 0, count90120: 0, count120180: 0, count180: 0, count: 0 };
  constructor(private depotService: DepotService, public toaster: ToasterService, public service: CommonService) { }

  ngOnInit(): void {
    this.getagingRecList();
    this.getVariantList();
    this.getModelList();
  }
  getagingRecList() {
    if(this.selectedVariantName) {
      this.data = {
        locationType:"DEPOT",
        type:"production",
        variantCode: this.selectedVariantName,
        useType:"ALL"
      }
    }
    if(this.selectedModelName) {
      this.data = {
        locationType:"DEPOT",
        type:"production",
        model: this.selectedModelName,
        useType:"ALL"
      }
    }
    if(this.selectedModelName && this.selectedModelName) {
      this.data = {
        locationType:"DEPOT",
        type:"production",
        variantCode: this.selectedVariantName,
        model: this.selectedModelName,
        useType:"ALL"
      }
    }

    this.depotService.agingFromRec(this.data).subscribe(res=> {
      this.ageRecData=res.data;
      this.limits = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }, { key: "ALL", value: this.ageRecData.length }];
      if(this.ageRecData.length > 0) {
        this.ageRecData.forEach((item: { count30: any; count3060:any, count6090:any; count90120: any; count120180: any; count180:any; count: any;}) => {
          this.total.count30 = this.total.count30 + item.count30;
          this.total.count3060 = this.total.count3060 + item.count3060;
          this.total.count6090 = this.total.count6090 + item.count6090;
          this.total.count90120 = this.total.count90120 + item.count90120;
          this.total.count120180 = this.total.count120180 + item.count120180;
          this.total.count180 = this.total.count180 + item.count180;
          this.total.count = this.total.count + item.count;
        });
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.total ={ count30: 0, count3060: 0, count6090: 0, count90120: 0, count120180: 0, count180: 0, count: 0 };
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      // console.log(error);
      this.toaster.showInfo("Data", error);
    });
  }
  getVariantList() {
    this.service.getVariant().subscribe(res => {
      this.variantList = res.data;
      if (this.variantList.length > 0) {
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      this.toaster.showError('Error', error);
    });
  }

  getModelList() {
    this.service.getModel().subscribe(res => {
      this.modelList = res.data;
      if (this.modelList.length > 0) {
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      this.toaster.showError('Error', error);
    });
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
}
