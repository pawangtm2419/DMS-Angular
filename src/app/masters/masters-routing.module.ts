import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { AddCustomerComponent } from './customer-master/add-customer/add-customer.component';
import { EditCustomerComponent } from './customer-master/edit-customer/edit-customer.component';
import { DealerMasterComponent } from './dealer-master/dealer-master.component';
import { EditDealerComponent } from './dealer-master/edit-dealer/edit-dealer.component';
import { AddDealerComponent } from './dealer-master/add-dealer/add-dealer.component';
import { DepotMasterComponent } from './depot-master/depot-master.component';
import { AddDepotComponent } from './depot-master/add-depot/add-depot.component';
import { EditDepotComponent } from './depot-master/edit-depot/edit-depot.component';
import { FinancialMasterComponent } from './financial-master/financial-master.component';
import { AddFinancialComponent } from './financial-master/add-financial/add-financial.component';
import { EditFinancialComponent } from './financial-master/edit-financial/edit-financial.component';
import { OnPowerMasterComponent } from './on-power-master/on-power-master.component';
import { AddOnPowerComponent } from './on-power-master/add-on-power/add-on-power.component';
import { EditOnPowerComponent } from './on-power-master/edit-on-power/edit-on-power.component';
import { PartMasterComponent } from './part-master/part-master.component';
import { AddPartComponent } from './part-master/add-part/add-part.component';
import { EditPartComponent } from './part-master/edit-part/edit-part.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { EditRoleComponent } from './role-master/edit-role/edit-role.component';
import { StateMasterComponent } from './state-master/state-master.component';
import { AddStateComponent } from './state-master/add-state/add-state.component';
import { EditStateComponent } from './state-master/edit-state/edit-state.component';
import { TransporterMasterComponent } from './transporter-master/transporter-master.component';
import { AddTransportComponent } from './transporter-master/add-transport/add-transport.component';
import { EditTransportComponent } from './transporter-master/edit-transport/edit-transport.component';
import { UserMasterComponent } from './user-master/user-master.component';
import { AddUserComponent } from './user-master/add-user/add-user.component';
import { EditUserComponent } from './user-master/edit-user/edit-user.component';
import { VariantMasterComponent } from './variant-master/variant-master.component';
import { AddVariantComponent } from './variant-master/add-variant/add-variant.component';
import { EditVariantComponent } from './variant-master/edit-variant/edit-variant.component';
import { ZoneMasterComponent } from './zone-master/zone-master.component';
import { AddZoneComponent } from './zone-master/add-zone/add-zone.component';
import { EditZoneComponent } from './zone-master/edit-zone/edit-zone.component';
import { CityMasterComponent } from './city-master/city-master.component';
import { AddCityComponent } from './city-master/add-city/add-city.component';
import { EditCityComponent } from './city-master/edit-city/edit-city.component';

const routes: Routes = [
  { path: 'customer', component: CustomerMasterComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'dealer', component: DealerMasterComponent },
  { path: 'add-dealer', component: AddDealerComponent },
  { path: 'edit-dealer/:id', component: EditDealerComponent },
  { path: 'depot', component: DepotMasterComponent },
  { path: 'add-depot', component: AddDepotComponent },
  { path: 'edit-depot/:id', component: EditDepotComponent },
  { path: 'financial', component: FinancialMasterComponent },
  { path: 'add-financial', component: AddFinancialComponent },
  { path: 'edit-financial/:id', component: EditFinancialComponent },
  { path: 'onPower', component: OnPowerMasterComponent },
  { path: 'add-onPower', component: AddOnPowerComponent },
  { path: 'edit-onPower/:id', component: EditOnPowerComponent },  
  { path: 'part', component: PartMasterComponent },
  { path: 'add-part', component: AddPartComponent },
  { path: 'edit-part/:id', component: EditPartComponent },
  { path: 'role', component: RoleMasterComponent },
  { path: 'edit-role/:id', component: EditRoleComponent },
  { path: 'state', component: StateMasterComponent },
  { path: 'add-state', component: AddStateComponent },
  { path: 'edit-state/:id', component: EditStateComponent },
  { path: 'transporter', component: TransporterMasterComponent },
  { path: 'add-transporter', component: AddTransportComponent },
  { path: 'edit-transporter/:id', component: EditTransportComponent },
  { path: 'user', component: UserMasterComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'variant', component: VariantMasterComponent },
  { path: 'add-variant', component: AddVariantComponent },
  { path: 'edit-variant/:id', component: EditVariantComponent },
  { path: 'zone', component: ZoneMasterComponent },
  { path: 'add-zone', component: AddZoneComponent },
  { path: 'edit-zone/:id', component: EditZoneComponent },
  { path: 'city', component: CityMasterComponent },
  { path: 'add-city', component: AddCityComponent },
  { path: 'edit-city/:id', component: EditCityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
