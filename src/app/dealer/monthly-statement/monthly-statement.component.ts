import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-statement',
  templateUrl: './monthly-statement.component.html',
  styleUrls: ['./monthly-statement.component.css']
})
export class MonthlyStatementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
  refresh(): void {
    this.ngOnInit();
  }

}
