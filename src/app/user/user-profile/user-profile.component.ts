import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: any;
  isEditProfile: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.profile = [JSON.parse(localStorage.getItem("user") || '{}').data];
  }

  editProfile(): void {
    console.log(this.profile);
    this.isEditProfile = true;
  }

  updateUser(user: any): void {
    console.log(user);
    this.profile = [user];
    this.isEditProfile = false;
  }

}
