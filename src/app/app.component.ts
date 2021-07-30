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
  user!: User;

  constructor(private service: UserService, public router: Router) {
    this.service.user.subscribe((x) => {
      this.user = x
    });
  }

  ngOnInit(): void { }
}
