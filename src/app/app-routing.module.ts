import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppGuard } from './shared/app.guard';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AppGuard] },
  { path: 'city-master', loadChildren: () => import('./masters/city-master/city-master.module').then(m => m.CityMasterModule), canActivate: [AppGuard] },
  { path: 'customer-master', loadChildren: () => import('./masters/customer-master/customer-master.module').then(m => m.CustomerMasterModule), canActivate: [AppGuard] },
  { path: 'dealer-master', loadChildren: () => import('./masters/dealer-master/dealer-master.module').then(m => m.DealerMasterModule), canActivate: [AppGuard] },
  { path: 'depot-master', loadChildren: () => import('./masters/depot-master/depot-master.module').then(m => m.DepotMasterModule), canActivate: [AppGuard] },
  { path: 'financial-master', loadChildren: () => import('./masters/financial-master/financial-master.module').then(m => m.FinancialMasterModule), canActivate: [AppGuard] },
  { path: 'on-power-master', loadChildren: () => import('./masters/on-power-master/on-power-master.module').then(m => m.OnPowerMasterModule), canActivate: [AppGuard] },
  { path: 'part-master', loadChildren: () => import('./masters/part-master/part-master.module').then(m => m.PartMasterModule), canActivate: [AppGuard] },
  { path: 'roles-master', loadChildren: () => import('./masters/role-master/role-master.module').then(m => m.RoleMasterModule), canActivate: [AppGuard] },
  { path: 'state-master', loadChildren: () => import('./masters/state-master/state-master.module').then(m => m.StateMasterModule), canActivate: [AppGuard] },
  { path: 'transport-master', loadChildren: () => import('./masters/transporter-master/transporter-master.module').then(m => m.TransporterMasterModule), canActivate: [AppGuard] },
  { path: 'variant-master', loadChildren: () => import('./masters/variant-master/variant-master.module').then(m => m.VariantMasterModule), canActivate: [AppGuard] },
  { path: 'zone-master', loadChildren: () => import('./masters/zone-master/zone-master.module').then(m => m.ZoneMasterModule), canActivate: [AppGuard] },
  { path: 'user-master', loadChildren: () => import('./masters/user-master/user-master.module').then(m => m.UserMasterModule), canActivate: [AppGuard] },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
