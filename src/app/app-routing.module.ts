import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppGuard } from './shared/app.guard';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AppGuard] },
  //master's modules
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
  //plant's module
  { path: 'plant-stock', loadChildren: () => import('./plant/plant-stock/plant-stock.module').then(m => m.PlantStockModule), canActivate: [AppGuard] },
  { path: 'c-stock', loadChildren: () => import('./plant/capitalized-stock/capitalized-stock.module').then(m => m.CapitalizedStockModule), canActivate: [AppGuard] },
  //depot's modules
  { path: 'depotAgingProduction', loadChildren: () => import('./depot/aging-from-production/aging-from-production.module').then(m => m.AgingFromProductionModule), canActivate: [AppGuard] },
  { path: 'depotAgingRecieved', loadChildren: () => import('./depot/aging-from-recieved/aging-from-recieved.module').then(m => m.AgingFromRecievedModule), canActivate: [AppGuard] },
  { path: 'depot-DealerInvoice', loadChildren: () => import('./depot/dealer-invoice/dealer-invoice.module').then(m => m.DealerInvoiceModule), canActivate: [AppGuard] },
  { path: 'depot-DepotInvoice', loadChildren: () => import('./depot/depot-invoice/depot-invoice.module').then(m => m.DepotInvoiceModule), canActivate: [AppGuard] },
  { path: 'depotStock', loadChildren: () => import('./depot/depot-stock/depot-stock.module').then(m => m.DepotStockModule), canActivate: [AppGuard] },
  { path: 'grNote', loadChildren: () => import('./depot/generate-transfer-note/generate-transfer-note.module').then(m => m.GenerateTransferNoteModule), canActivate: [AppGuard] },
  { path: 'salesReturnInvoice', loadChildren: () => import('./depot/sales-return-invoice/sales-return-invoice.module').then(m => m.SalesReturnInvoiceModule), canActivate: [AppGuard] },
  { path: 'depotStockVariantWise', loadChildren: () => import('./depot/variant-depot-stock/variant-depot-stock.module').then(m => m.VariantDepotStockModule), canActivate: [AppGuard] },

  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  //imports: [RouterModule.forRoot(routes,{ useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
