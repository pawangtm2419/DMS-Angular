import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-sales',
  templateUrl: './return-sales.component.html',
  styleUrls: ['./return-sales.component.css']
})
export class ReturnSalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
  refresh(): void {
    this.ngOnInit();
  }

}
