import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent }
];

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserProfileModule { }
