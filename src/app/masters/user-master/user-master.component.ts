import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {
  usersData: any;
  p: number = 1;
  pageSize = 50;

  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getUserList();
  }
  
  getUserList() {
    this.master.getusers().subscribe(res=> {
      this.usersData=res.data;
    }, (error) => {
      console.log(error);
    });
  }

  userDelete(code: String) {
    console.log(code)
  }
}
