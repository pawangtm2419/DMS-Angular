import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DepotService, ToasterService, CommonService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-depot-stock',
  templateUrl: './depot-stock.component.html',
  styleUrls: ['./depot-stock.component.css']
})
export class DepotStockComponent implements OnInit {
  searchData: any;
  depotData: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  depotList: any;
  selectedDepotName: any;
  selectedModelName: any;
  modelList: any;
  data: any = {type: 'DEPOTSTOCK', useType: 'ALL'};
  isExcelDownload:boolean = false;
  constructor(private depot: DepotService, public toaster: ToasterService,  public service: CommonService) { }

  ngOnInit(): void {
    this.getdepotStockList();
    this.getCityList();
    this.getModelList();
  }
  refresh(): void {
    this.ngOnInit();
  }
  getdepotStockList() {
    this.service.getVehicleDetails(this.data).subscribe(res => {
      this.depotData = res.data;
      if (this.depotData.length > 0) {
        this.isExcelDownload = true;
        this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.depotData.length }];
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      this.toaster.showInfo('Data', error);
    });
  }

  getFilteredDepotStockList() {
    if (this.selectedDepotName) {
      this.data = {depot: this.selectedDepotName};
    }
    if (this.selectedModelName) {
      this.data = {model: this.selectedModelName};
    }
    if (this.selectedModelName && this.selectedDepotName) {
      this.data = {depot: this.selectedDepotName,  model: this.selectedModelName};
    }
    this.depot.getFilteredDepotStock(this.data).subscribe(res => {
      this.depotData = res.data;
      if (this.depotData.length > 0) {
        this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.depotData.length }];
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      this.toaster.showInfo('Data', error);
    });
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
    this.limit = (document.getElementById('limit') as HTMLInputElement).value;
  }

  removeChassis(pStock: any) {
    console.log([pStock]);
  }

  form22(pStock: any) {
    console.log([pStock]);
  }

  editDepotIndo(pStock: any) {
    console.log([pStock]);
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "depotStockReport.xlsx");
  }
}
