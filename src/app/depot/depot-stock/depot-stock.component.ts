import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DepotService, ToasterService } from 'src/app/shared/services';

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
  constructor(private dealer: DepotService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getdepotStockList();
  }
  getdepotStockList() {
    const data = {type: 'DEPOTSTOCK', useType: 'ALL'};
    this.dealer.depotStock(data).subscribe(res => {
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

}
