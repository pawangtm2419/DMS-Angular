import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentdate= new Date();
  constructor() { }

  ngOnInit(): void { }
  refresh(): void {
    this.ngOnInit();
  }
}
