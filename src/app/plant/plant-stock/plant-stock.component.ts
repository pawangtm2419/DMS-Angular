import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlantService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-plant-stock',
  templateUrl: './plant-stock.component.html',
  styleUrls: ['./plant-stock.component.css']
})
export class PlantStockComponent implements OnInit {
  plantStock: any;
  searchData: any;
  limits = [{ key: '50', value: 50 }, { key: '100', value: 100 }, { key: '250', value: 250 }, { key: '500', value: 500 }];
  pageData = 1;
  limit: any = 50;
  constructor(private service: PlantService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.plantStockData();
  }
  plantStockData() {
    let stock = {type: 'PLANTSTOCK'};
    this.service.plantStock(stock).subscribe(res => {
      this.plantStock = res.data;
      if (this.plantStock.length > 0) {
        this.toaster.showSuccess('Data', 'Report successfully Open.');
        this.limits.push({ key: 'ALL', value: this.plantStock.length });
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      this.toaster.showError('Error', error);
    });
  }

  dataLimit() {
    this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
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
