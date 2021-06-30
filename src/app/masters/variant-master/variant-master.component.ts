import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-variant-master',
  templateUrl: './variant-master.component.html',
  styleUrls: ['./variant-master.component.css']
})
export class VariantMasterComponent implements OnInit {
  variantData: any;
  p: number = 1;
  pageSize = 50;
  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getVariantList();
  }
  getVariantList() {
    this.master.getVariant().subscribe(res=> {
      this.variantData=res.data;
    }, (error) => {
      console.log(error);
    });
  }

  variantDelete(code: String) {
    console.log(code);
  }
}
