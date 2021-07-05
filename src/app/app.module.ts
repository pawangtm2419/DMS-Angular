import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/component/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { ToasterService } from './shared/services/toster.service';
import { AppGuard } from './shared/app.guard';
import { UserService } from './shared/services/user.service';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { ChangePassComponent } from './user/change-pass/change-pass.component';
import { CloseDateComponent } from './user/close-date/close-date.component';
import { UpdateVehicleComponent } from './user/update-vehicle/update-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserProfileComponent,
    ChangePassComponent,
    CloseDateComponent,
    UpdateVehicleComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      newestOnTop: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserService, AppGuard, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
