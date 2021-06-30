import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.css']
})
export class RoleMasterComponent implements OnInit {
  rolesData: any;
  p: number = 1;
  pageSize = 50;

  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getRolessList();
  }
  getRolessList() {
    this.master.getRoles().subscribe(res=> {
      this.rolesData=res.data;
    }, (error) => {
      console.log(error);
    });
  }

  roleDelete(code: String) {
    console.log(code);
  }
}
