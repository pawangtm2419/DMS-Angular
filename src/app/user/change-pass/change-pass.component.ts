import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService, UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  profile: any;
  updatePassword!: FormGroup;

  constructor(private user: UserService, private toster: ToasterService) { }

  ngOnInit(): void {
    this.profile = [JSON.parse(localStorage.getItem("user") || '{}').data];
    this.updatePassword = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
  refresh(): void {
    this.ngOnInit();
  }
  get oldPassword() { return this.updatePassword.value.oldPassword; }
  get newPassword() { return this.updatePassword.value.newPassword; }
  get confirmPassword() { return this.updatePassword.value.confirmPassword; }

  passwordChange(): void {
    if(this.updatePassword.valid) {
      if(this.updatePassword.value.oldPassword !== this.updatePassword.value.newPassword) {
        if(this.updatePassword.value.newPassword === this.updatePassword.value.confirmPassword) {
          const data = {
            oldPassword: this.updatePassword.value.oldPassword,
            newPassword: this.updatePassword.value.newPassword,
            id: this.profile[0].id
          };
          this.user.changePassword(data).subscribe(
            (data: any) => {
              if(data.status) {
                this.toster.showSuccess("success", "Password Changed Successfully");
                this.updatePassword.reset();
              } else {
                this.toster.showError("error", "Password Changed failed");
                this.updatePassword.reset();
              }
            },
            (error: any) => {
              this.toster.showError("Error", "Error Occured "+error);
            });
        } else {
          this.toster.showError('Error', "New password and confirm password do not match");
        }
      } else {
        this.toster.showError('Error', 'Old password and new password are not the same');
      }
    } else {
      this.toster.showError('Error', 'Please fill all the fields');
    }
  }
}
