import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-dealer-master',
  templateUrl: './dealer-master.component.html',
  styleUrls: ['./dealer-master.component.css']
})
export class DealerMasterComponent implements OnInit {
  dealerData: any;
  title = "Dealer Master";
  p: number = 1;
  pageSize = 50;
  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getDealersList();
  }
  getDealersList() {
    let data = {useType: "ALL"};
    this.master.getDealers(data).subscribe(res=> {
      this.dealerData=res.msg;
    }, (error) => {
      console.log(error);
    });
  }
}
