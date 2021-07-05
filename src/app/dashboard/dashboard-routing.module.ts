import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleHistoryComponent } from './vehicle-history/vehicle-history.component';
import { HistoryReportComponent } from './history-report/history-report.component';
import { AppGuard } from '../shared/app.guard';

const routes: Routes = [
  { path: 'VvehicleHistory', component: VehicleHistoryComponent, canActivate: [AppGuard] },
  { path: ' historyReport', component: HistoryReportComponent, canActivate: [AppGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
