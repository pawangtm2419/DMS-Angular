import { Component, OnInit } from '@angular/core';
import { DepotService, ToasterService } from 'src/app/shared/services';

@Component({
  selector: 'app-aging-from-recieved',
  templateUrl: './aging-from-recieved.component.html',
  styleUrls: ['./aging-from-recieved.component.css']
})
export class AgingFromRecievedComponent implements OnInit {
  searchData: any;
  ageRecData: any;
  pageData = 1;
  limits: any = [{ key: 50, value: 50 }];
  limit: any = 50;
  constructor(private dealer: DepotService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getagingRecList();
  }
  getagingRecList() {
    const data = {locationType: 'DEPOT', type: 'production', useType: 'ALL'};
    this.dealer.agingFromRec(data).subscribe(res => {
      this.ageRecData = res.data;
      if (this.ageRecData.length > 0) {
        this.limits = [{ key: 50, value: 50 }, { key: 100, value: 100 }, { key: 250, value: 250 }, { key: 500, value: 500 }, { key: 'ALL', value: this.ageRecData.length }];
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
