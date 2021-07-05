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
  limits: any;
  constructor(private service: PlantService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.capitalizeStockData();
  }
  capitalizeStockData() {
    let stock = {};
    this.service.cStock(stock, this.httpOptions).subscribe(res=> {
      this.cPlantStock=res.data;
      if(this.cPlantStock.length > 0) {
        console.log(this.cPlantStock);
        this.toaster.showSuccess("Data", "Report successfully Open.");
        this.limits = [{ "key": 10, "value": 10 }, { "key": 25, "value": 25 }, { "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { key: "ALL", value: this.cPlantStock.length }];
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showError("Error", error);
    });
  }
}
