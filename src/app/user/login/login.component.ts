import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toster.service';
import { first } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userInfo: any;
  submit = false;
  constructor(private service: UserService, private router: Router, public toaster: ToasterService, private cookie: CookieService) { }

  ngOnInit(): void {
    if (this.service.gettoken()) {
      this.router.navigate(['home']);
    }
  }

  getUserInfo(logIn: NgForm): void{
    if (logIn.valid) {
      this.submit = true;
    }
    if (this.submit) {
      this.service.userUogIn(logIn.value).subscribe(res => {
        if (res.status === 'true') {
          this.toaster.showSuccess('Success', 'Log in successfull');
          this.cookie.set('token', res.token);
          this.router.navigate(['home']);
        } else if (res.status === 'false') {
          this.toaster.showError('Error', res.msg);
        }
      }, (error) => {
        this.toaster.showError('Error', error);
      });
    }
  }
}
