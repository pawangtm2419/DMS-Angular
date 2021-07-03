import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css']
})
export class CityMasterComponent implements OnInit {
  citiesData: any;
  p: number = 1;

  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getCityList();
  }
  getCityList() {
    this.master.getCity().subscribe(res=> {
      this.citiesData = res.data;
    }, (error) => {
      console.log(error);
    });
  }

  cityDelete(id: any) {
    console.log(id);
  }
}

