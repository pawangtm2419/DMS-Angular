import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlantService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-plant-stock',
  templateUrl: './plant-stock.component.html',
  styleUrls: ['./plant-stock.component.css']
})
export class PlantStockComponent implements OnInit {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
  plantStock: any;
  limits: any;
  pageData: number = 1;
  limit: any = 10;
  constructor(private service: PlantService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.plantStockData();
  }
  plantStockData() {
    var stock = {type: "PLANTSTOCK"};
    this.service.plantStock(stock, this.httpOptions).subscribe(res=> {
      this.plantStock=res.data;
      if(this.plantStock.length > 0) {
        this.toaster.showSuccess("Data", "Report successfully Open.");
        this.limits = [{ "key": 10, "value": 10 }, { "key": 25, "value": 25 }, { "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { key: "ALL", value: this.plantStock.length }];
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      this.toaster.showError("Error", error);
    });
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
}
