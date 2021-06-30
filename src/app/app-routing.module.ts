import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppGuard } from './shared/app.guard';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AppGuard] },
  { path: 'master', loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule), canActivate: [AppGuard] },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
