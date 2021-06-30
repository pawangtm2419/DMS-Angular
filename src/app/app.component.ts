import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DMS-Angular';
  user: any;
  
  constructor(private service: UserService, private router: Router) { }
  
  ngOnInit(): void { 
    this.user = this.service.gettoken();
  }
}
