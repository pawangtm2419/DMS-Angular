import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlantService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-capitalized-stock',
  templateUrl: './capitalized-stock.component.html',
  styleUrls: ['./capitalized-stock.component.css']
})
export class CapitalizedStockComponent implements OnInit {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
  cPlantStock: any;
  searchData: any;
  limits = [{ "key": "50", "value": 50 }, { "key": "100", "value": 100 }, { "key": "250", "value": 250 }, { "key": "500", "value": 500 }];
  pageData: number = 1;
  limit: any = 50;
  constructor(private service: PlantService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.capitalizeStockData();
  }
  capitalizeStockData() {
    let stock = {};
    this.service.cStock(stock, this.httpOptions).subscribe(res=> {
      this.cPlantStock=res.data;
      if(this.cPlantStock.length > 0) {
        this.toaster.showSuccess("Data", "Report successfully Open.");
        this.limits.push({ "key": "ALL", value: this.cPlantStock.length });
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
}
