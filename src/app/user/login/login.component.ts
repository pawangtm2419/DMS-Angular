import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toster.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userInfo: any;
  submit = false;
  logIntryCount = 0;
  constructor(private service: UserService, private router: Router, public toaster: ToasterService, private cookie: CookieService) { }

  ngOnInit(): void {
    if (this.service.gettoken()) {
      this.router.navigate(['home']);
    }
  }
  refresh(): void {
    this.ngOnInit();
  }

  getUserInfo(logIn: NgForm): void{
    /* const loginCount = this.cookie.get('LogInCount');
    var y: number = +loginCount; */
    if (logIn.valid) {
      this.submit = true;
    }
    if (this.logIntryCount < 3 || this.cookie.get('LogInUser') !== logIn.value.empID) {
      if (this.submit) {
        this.service.userUogIn(logIn.value).subscribe((res: any) => {
          if (res.status) {
            this.toaster.showSuccess('Success', 'Log in successfull');
            this.cookie.set('token', res.token);
            window.location.reload();
            this.router.navigate(['home']);
          } else {
            this.logIntryCount++;
            this.cookie.set('LogInUser', logIn.value.empID);
            this.cookie.set('LogInCount', JSON.stringify(this.logIntryCount));
            this.toaster.showError('Error', 'Please enter valid ID and password.');
          }
        }, (error: any) => {
          this.toaster.showError('Error', error);
        });
      }
    } else {
      this.toaster.showError('Error', 'You have reached maximum login attempts!');
    }
  }
}
