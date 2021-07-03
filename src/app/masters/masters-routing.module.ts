import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { DealerMasterComponent } from './dealer-master/dealer-master.component';
import { DepotMasterComponent } from './depot-master/depot-master.component';
import { FinancialMasterComponent } from './financial-master/financial-master.component';
import { OnPowerMasterComponent } from './on-power-master/on-power-master.component';
import { PartMasterComponent } from './part-master/part-master.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { StateMasterComponent } from './state-master/state-master.component';
import { TransporterMasterComponent } from './transporter-master/transporter-master.component';
import { UserMasterComponent } from './user-master/user-master.component';
import { VariantMasterComponent } from './variant-master/variant-master.component';
import { ZoneMasterComponent } from './zone-master/zone-master.component';
import { CityMasterComponent } from './city-master/city-master.component';
import { AppGuard } from '../shared/app.guard';

const routes: Routes = [
  { path: 'customer', component: CustomerMasterComponent, canActivate: [AppGuard] },
  { path: 'dealer', component: DealerMasterComponent, canActivate: [AppGuard] },
  { path: 'depot', component: DepotMasterComponent, canActivate: [AppGuard] },
  { path: 'financial', component: FinancialMasterComponent, canActivate: [AppGuard] },
  { path: 'onPower', component: OnPowerMasterComponent, canActivate: [AppGuard] },
  { path: 'part', component: PartMasterComponent, canActivate: [AppGuard] },
  { path: 'role', component: RoleMasterComponent, canActivate: [AppGuard] },
  { path: 'state', component: StateMasterComponent, canActivate: [AppGuard] },
  { path: 'transporter', component: TransporterMasterComponent, canActivate: [AppGuard] },
  { path: 'user', component: UserMasterComponent, canActivate: [AppGuard] },
  { path: 'variant', component: VariantMasterComponent, canActivate: [AppGuard] },
  { path: 'zone', component: ZoneMasterComponent, canActivate: [AppGuard] },
  { path: 'city', component: CityMasterComponent, canActivate: [AppGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
