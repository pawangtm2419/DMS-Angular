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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SaleReturnReceiptListComponent } from './dealer/sale-return-receipt-list/sale-return-receipt-list.component';
import { DealerCollectionEntryComponent } from './dealer/dealer-collection-entry/dealer-collection-entry.component';
import { StatementUploadComponent } from './dealer/statement-upload/statement-upload.component';
import { OpeningClosingSheetComponent } from './dealer/opening-closing-sheet/opening-closing-sheet.component';
import { MonthlyStatementComponent } from './dealer/monthly-statement/monthly-statement.component';
import { PlanSalePlanUploadComponent } from './dealer/plan-sale-plan-upload/plan-sale-plan-upload.component';
import { PlanSalePlanReportComponent } from './dealer/plan-sale-plan-report/plan-sale-plan-report.component';
import { PlanCollectionPlanUploadComponent } from './dealer/plan-collection-plan-upload/plan-collection-plan-upload.component';
import { PlanCollectionPlanReportComponent } from './dealer/plan-collection-plan-report/plan-collection-plan-report.component';
import { PlanDeliveryPlanReportComponent } from './dealer/plan-delivery-plan-report/plan-delivery-plan-report.component';
import { PlanDeliveryPlanUploadComponent } from './dealer/plan-delivery-plan-upload/plan-delivery-plan-upload.component';
import { PlanRetailPlanReportComponent } from './dealer/plan-retail-plan-report/plan-retail-plan-report.component';
import { PlanRetailPlanUploadComponent } from './dealer/plan-retail-plan-upload/plan-retail-plan-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SaleReturnReceiptListComponent,
    DealerCollectionEntryComponent,
    StatementUploadComponent,
    OpeningClosingSheetComponent,
    MonthlyStatementComponent,
    PlanSalePlanUploadComponent,
    PlanSalePlanReportComponent,
    PlanCollectionPlanUploadComponent,
    PlanCollectionPlanReportComponent,
    PlanDeliveryPlanReportComponent,
    PlanDeliveryPlanUploadComponent,
    PlanRetailPlanReportComponent,
    PlanRetailPlanUploadComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
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
