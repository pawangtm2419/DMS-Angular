import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opening-closing-sheet',
  templateUrl: './opening-closing-sheet.component.html',
  styleUrls: ['./opening-closing-sheet.component.css']
})
export class OpeningClosingSheetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
  refresh(): void {
    this.ngOnInit();
  }

}
