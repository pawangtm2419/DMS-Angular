import { Component, OnInit } from '@angular/core';
import { PlantService, ToasterService, UserService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-capitalized-stock',
  templateUrl: './capitalized-stock.component.html',
  styleUrls: ['./capitalized-stock.component.css']
})
export class CapitalizedStockComponent implements OnInit {
  cPlantStock: any;
  searchData: any;
  limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: '500', value: 500 }];
  pageData = 1;
  limit: any = 50;
  localStrg: any = localStorage.getItem("user") || {};
  isExcelDownload: boolean = false;
  constructor(private service: PlantService, private toaster: ToasterService, private user: UserService) { }

  ngOnInit(): void {
    this.capitalizeStockData();
  }
  refresh(): void {
    this.ngOnInit();
  }
  capitalizeStockData(): void {
    const stock = {};
    this.service.cStock(stock).subscribe((res: any) => {
      this.cPlantStock = res.data;
      if (this.cPlantStock.length > 0) {
        this.isExcelDownload = true;
        this.toaster.showSuccess('Data', 'Report successfully Open.');
        this.limits.push({ key: 'ALL', value: this.cPlantStock.length });
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error: any) => {
      this.toaster.showError('Error', error);
    });
  }

  dataLimit(): void {
    this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
  }

  //moveToPlant(data)
  goPlantStock(cStock: any): void {
    const data = {
      chassisNo: cStock.chassisNo,
      createdBy: JSON.parse(this.localStrg).data.empID,
    }
    this.service.moveToPlant(data).subscribe((res: any) => {
      if (res.status) {
        this.toaster.showSuccess('Success', 'Moved in Plant Stock.');
        this.capitalizeStockData();
      }
    }, (error: any) => {
      this.toaster.showError('Error', error);
    });
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "capitalizeStockReport.xlsx");
  }
}
