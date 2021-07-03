import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toster.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userInfo: any;
  submit = false;
  constructor(private service: UserService, private router: Router, public toaster: ToasterService) { }

  ngOnInit(): void {
    if(this.service.gettoken()) {
      this.router.navigate(['home']);
    }
   }

  getUserInfo(logIn: NgForm) {
    if(logIn.valid) {
      this.submit = true;
    }
    if(this.submit) {
      this.service.userUogIn(logIn.value).subscribe(async res=> {
        if(res.status == "true") {
          this.toaster.showSuccess("Success", "Log in successfull");
          window.localStorage.setItem("profile", JSON.stringify(res));
          window.localStorage.setItem("token", JSON.stringify(res.token));
          await this.router.navigate(['home']);
        } else if(res.status == "false") {
          console.log(res.data);
        }
      }, (error) => {
        console.log(error.statusText);
      });
    }
  }
}
