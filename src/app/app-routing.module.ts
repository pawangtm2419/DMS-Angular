import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppGuard } from './shared/app.guard';
import { LoginComponent } from './user/login/login.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { ChangePassComponent } from './user/change-pass/change-pass.component';
import { CloseDateComponent } from './user/close-date/close-date.component';
import { UpdateVehicleComponent } from './user/update-vehicle/update-vehicle.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AppGuard] },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AppGuard] },
  { path: 'master', loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule), canActivate: [AppGuard] },
  { path: 'plant', loadChildren: () => import('./plant/plant.module').then(m => m.PlantModule), canActivate: [AppGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AppGuard] },
  { path: 'change', component: ChangePassComponent, canActivate: [AppGuard] },
  { path: 'closing-date', component: CloseDateComponent, canActivate: [AppGuard] },
  { path: 'update-vehicle', component: UpdateVehicleComponent, canActivate: [AppGuard] },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
