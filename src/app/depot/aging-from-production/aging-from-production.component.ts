import { Component, OnInit } from '@angular/core';
import { DepotService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-aging-from-production',
  templateUrl: './aging-from-production.component.html',
  styleUrls: ['./aging-from-production.component.css']
})
export class AgingFromProductionComponent implements OnInit {
  searchData: any;
  ageProdData: any;
  pageData = 1;
  limits: any;
  limit: any = 50;
  constructor(private dealer: DepotService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getagingProdList();
  }
  getagingProdList() {
    const data = {locationType: 'DEPOT', type: 'production', useType: 'ALL'};
    this.dealer.agingFromProd(data).subscribe(res => {
      this.ageProdData = res.data;
      console.log(this.ageProdData);
      this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.ageProdData.length }];
      if (this.ageProdData.length > 0) {
        this.toaster.showSuccess('Data', 'Report successfully Open.');
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      // console.log(error);
      this.toaster.showInfo('Data', error);
    });
  }

  dataLimit() {
    this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
  }

}
