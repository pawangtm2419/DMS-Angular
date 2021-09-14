import { Component, OnInit } from '@angular/core';
import { ToasterService, UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: any;
  isEditProfile: boolean = false;
  constructor(private user: UserService, private toster: ToasterService) { }

  ngOnInit(): void {
    this.profile = [JSON.parse(localStorage.getItem("user") || '{}').data];
  }

  editProfile(): void {
    this.isEditProfile = true;
  }

  updateUser(user: any): void {
    console.log(user);
    this.profile = [user];
    const data ={
      "useType" : user.useType,
      "role" : user.role,
      "userMarket" : user.userMarket,
      "userZone" : user.userZone,
      "userState" : user.userState,
      "code" : user.code,
      "empID" : user.empID,
      "companyName" : user.companyName,
      "firstName" : user.firstName,
      "lastName" : user.lastName,
      "email" : user.email,
      "mobile" : user.mobile,
      "status" : user.status,
      "createdBy" : user.createdBy,
      "forgetPassword" : user.forgetPassword,
      "deactivateDate" : user.deactivateDate,
      "activationDate" : user.activationDate,
      "createdDate" : user.createdDate,
      "isDeleted" : user.isDeleted,
      "isTemporaryPass" : user.isTemporaryPass,
      "alert" : {
        "EMAIL" : false,
        "SMS" : false,
        "PUSH" : false
      },
      "address" : {
        "city" : user.address.city,
        "country" : user.address.country,
        "zipcode" : user.address.zipcode,
        "state" : user.address.state,
        "location" : user.address.location
      }
    }
    this.user.updateUser(data).subscribe(
      (data: any) => {
        localStorage.setItem("user", JSON.stringify(data.data));
        this.toster.showSuccess("Updated", "User profile updated successfully");
        this.isEditProfile = false;
      },
      (error: any) => this.toster.showError("Error", error.error.error)
    );

    console.log(data);
    this.isEditProfile = false;
  }

}
