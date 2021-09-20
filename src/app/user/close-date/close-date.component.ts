import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-close-date',
  templateUrl: './close-date.component.html',
  styleUrls: ['./close-date.component.css']
})
export class CloseDateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
  refresh(): void {
    this.ngOnInit();
  }

}
