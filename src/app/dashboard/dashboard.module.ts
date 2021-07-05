import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { VehicleHistoryComponent } from './vehicle-history/vehicle-history.component';
import { HistoryReportComponent } from './history-report/history-report.component';


@NgModule({
  declarations: [
    VehicleHistoryComponent,
    HistoryReportComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
