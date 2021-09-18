import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-return-receipt-list',
  templateUrl: './sale-return-receipt-list.component.html',
  styleUrls: ['./sale-return-receipt-list.component.css']
})
export class SaleReturnReceiptListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
  refresh(): void {
    this.ngOnInit();
  }

}
