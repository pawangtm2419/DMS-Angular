import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './shared/model';
import { UserService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DMS-Angular';
  inLogIn: any;
  user = false;
  constructor(private service: UserService, public router: Router) { }

  ngOnInit(): void { 
    this.inLogIn = this.service.gettoken();
    if(this.inLogIn) {
      this.user = true;
    }
  }
}
