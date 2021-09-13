import { Component, OnInit } from '@angular/core';
import { MastersService, ToasterService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {
  searchData:any;
  usersData: string[] = [];
  usersInfo: any[] = [];
  pageData: number = 1;
  limits: any = [{ "key": 50, "value": 50 }, { "key": 100, "value": 100 }, { "key": 250, "value": 250 }, { "key": 500, "value": 500 }];
  limit: any = 50;
  isExcelDownload: boolean = false;
  filterUserData: any;
  userStatus: string ='Active';
  constructor(private master: MastersService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.master.getusers().subscribe((res) => {
      this.usersData=res.data;
      this.showInActive();
      if(this.usersData.length > 0) {
        this.isExcelDownload = true;
        this.limits.push({ "key": "ALL", value: this.usersData.length });
        this.toaster.showSuccess("Data", "Report successfully Open.");
      } else {
        this.toaster.showInfo("Data", "No record found.");
      }
    }, (error) => {
      console.log(error);
    });
  }
  viewFullInfo(user: any) {
    this.usersInfo = [user];
  }
  dataLimit() {
    this.limit = (<HTMLInputElement>document.getElementById("limit")).value;
  }
  userDelete(code: String) {
    console.log(code)
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "userReport.xlsx");
  }
  showInActive(): void{
    this.filterUserData = this.usersData;
    this.filterUserData = this.filterUserData.filter((user: any) => {
      return user.status === this.userStatus;
    });
    if(this.userStatus === 'Active') {
      this.userStatus = 'Deactive';
    } else {
      this.userStatus = 'Active';
    }
  }
}
