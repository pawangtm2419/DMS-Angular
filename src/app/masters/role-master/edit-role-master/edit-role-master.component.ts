import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-edit-role-master',
  templateUrl: './edit-role-master.component.html',
  styleUrls: ['./edit-role-master.component.css']
})
export class EditRoleMasterComponent implements OnInit {
  roles: any;
  roleCode!: Params;
  masterData: any;
  newFilterArray: any[] = [];
  main: any[] = [];
  sub: any[] = [];
  subSub: any[] = [];

  constructor(private service: UserService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.roleCode = params;
    });
    this.service.getRoleData({ role: this.roleCode.id }).subscribe((res: any) => {
      if (res.status === 'true') {
        this.roles = res.data;
        this.roles.filter((item: any) => {
          var arrkeys = Object.keys(item);
          arrkeys.map((keyVlaue) => {
            this.newFilterArray.push({
              "name": keyVlaue,
              "link": item[keyVlaue].link,
              "add": item[keyVlaue].add,
              "edit": item[keyVlaue].edit,
              "delete": item[keyVlaue].delete,
              "pageName": item[keyVlaue].pageName,
              "priority": item[keyVlaue].priority,
            });
          });
        });
        this.newFilterArray.map((item: any) => {
          if (item.priority === 0) {
            this.main.push(item);
          } else if (item.priority === 1) {
            this.sub.push(item);
          } else {
            this.subSub.push(item);
          }
        });
      }
    });
  }
}
