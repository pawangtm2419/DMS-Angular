import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user = false;
  constructor(private service: UserService, public router: Router) { }

  ngOnInit(): void { 
    this.service.user.subscribe((x) => {
      this.user = x;
    });
  }
}
