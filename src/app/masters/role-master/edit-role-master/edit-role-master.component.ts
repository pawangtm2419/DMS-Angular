import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToasterService, UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-edit-role-master',
  templateUrl: './edit-role-master.component.html',
  styleUrls: ['./edit-role-master.component.css']
})
export class EditRoleMasterComponent implements OnInit, OnDestroy {
  roles: any;
  searchData:any;
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  roleCode!: Params;
  masterData: any;
  newFilterArray: any[] = [];
  main: any[] = [];
  sub: any[] = [];
  subSub: any[] = [];
  updateRoles!: FormGroup;

  constructor(private service: UserService, private route: ActivatedRoute, private fb: FormBuilder, public toaster: ToasterService, private router: Router) { }
  form = this.fb.group({
    pageName: ['', Validators.required],
    link: [false],
    add: [false],
    edit: [false],
    delete: [false],
    priority: [0]
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.roleCode = params;
    });
    this.service.getRoleData({ role: this.roleCode.id }).subscribe((res: any) => {
      if (res.status) {
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
              "linkpath": item[keyVlaue].linkPath
            });
          });
          this.limit = this.newFilterArray.length;
        });
      }
    });
  }
  refresh(): void {
    this.ngOnInit();
  }
  ngOnDestroy(): void {
    this.newFilterArray = [];
    this.main = [];
    this.sub = [];
    this.subSub = [];
    this.masterData = [];
    this.roles = [];
  }

  addRoles() {
    var key = this.form.value.pageName.split(' ').join('_');
    const roleData = {
      link: this.form.value.link,
      add: this.form.value.add,
      edit: this.form.value.edit,
      delete: this.form.value.delete,
      priority: this.form.value.priority,
      pageName: this.form.value.pageName
    };
    const rolesKey = Object.keys(this.roles[0]);
    const rolesValue = Object.values(this.roles[0]);
    rolesKey.push(key);
    rolesValue.push(roleData);
    var result: any = {};
    for (var i = 0; i < rolesKey.length; i++) {
      result[rolesKey[i]] = rolesValue[i];
    }
    const submitData = {
      menuObject: [result],
      roleCode: this.roleCode.id
    };
    this.service.updateRole(submitData).subscribe((res: any) => {
      if (res.status) {
        this.toaster.showSuccess('Success', res.msg);
        this.ngOnDestroy();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    });
  }

  editRoles(role: any): void {
    const data = {
      add: role.add,
      delete: role.delete,
      edit: role.edit,
      link: role.link,
      linkpath: role.linkpath,
      name: role.name,
      pageName: role.pageName,
      priority: role.priority
    }
    const rolesKey = Object.keys(this.roles[0]);
    const rolesValue = Object.values(this.roles[0]);
    rolesKey.push(data.name);
    rolesValue.push(data);
    var result: any = {};
    for (var i = 0; i < rolesKey.length; i++) {
      result[rolesKey[i]] = rolesValue[i];
    }
    const submitData = {
      menuObject: [result],
      roleCode: this.roleCode.id
    };
    this.service.updateRole(submitData).subscribe((res: any) => {
      if (res.status) {
        this.ngOnDestroy();
        this.toaster.showSuccess('Success', res.msg);
        this.ngOnInit();
      }
    });
  }
}
