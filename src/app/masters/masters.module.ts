import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/component/shared.module';
import { MastersRoutingModule } from './masters-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

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

@NgModule({
  declarations: [
    CustomerMasterComponent,
    DealerMasterComponent,
    DepotMasterComponent,
    FinancialMasterComponent,
    OnPowerMasterComponent,
    PartMasterComponent,
    RoleMasterComponent,
    StateMasterComponent,
    TransporterMasterComponent,
    UserMasterComponent,
    VariantMasterComponent,
    ZoneMasterComponent,
    CityMasterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    MastersRoutingModule
  ]
})
export class MastersModule { }
