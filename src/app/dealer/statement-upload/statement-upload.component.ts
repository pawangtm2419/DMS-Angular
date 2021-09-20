import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statement-upload',
  templateUrl: './statement-upload.component.html',
  styleUrls: ['./statement-upload.component.css']
})
export class StatementUploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
  refresh(): void {
    this.ngOnInit();
  }

}
