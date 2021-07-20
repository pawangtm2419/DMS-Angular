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
  { path: 'm-city', loadChildren: () => import('./masters/city-master/city-master.module').then(m => m.CityMasterModule), canActivate: [AppGuard] },
  { path: 'm-customer', loadChildren: () => import('./masters/customer-master/customer-master.module').then(m => m.CustomerMasterModule), canActivate: [AppGuard] },
  { path: 'm-dealer', loadChildren: () => import('./masters/dealer-master/dealer-master.module').then(m => m.DealerMasterModule), canActivate: [AppGuard] },
  { path: 'm-depot', loadChildren: () => import('./masters/depot-master/depot-master.module').then(m => m.DepotMasterModule), canActivate: [AppGuard] },
  { path: 'm-financial', loadChildren: () => import('./masters/financial-master/financial-master.module').then(m => m.FinancialMasterModule), canActivate: [AppGuard] },
  { path: 'm-on-power', loadChildren: () => import('./masters/on-power-master/on-power-master.module').then(m => m.OnPowerMasterModule), canActivate: [AppGuard] },
  { path: 'm-part', loadChildren: () => import('./masters/part-master/part-master.module').then(m => m.PartMasterModule), canActivate: [AppGuard] },
  { path: 'm-roles', loadChildren: () => import('./masters/role-master/role-master.module').then(m => m.RoleMasterModule), canActivate: [AppGuard] },
  { path: 'm-state', loadChildren: () => import('./masters/state-master/state-master.module').then(m => m.StateMasterModule), canActivate: [AppGuard] },
  { path: 'm-transport', loadChildren: () => import('./masters/transporter-master/transporter-master.module').then(m => m.TransporterMasterModule), canActivate: [AppGuard] },
  { path: 'm-variant', loadChildren: () => import('./masters/variant-master/variant-master.module').then(m => m.VariantMasterModule), canActivate: [AppGuard] },
  { path: 'm-zone', loadChildren: () => import('./masters/zone-master/zone-master.module').then(m => m.ZoneMasterModule), canActivate: [AppGuard] },
  { path: 'm-user', loadChildren: () => import('./masters/user-master/user-master.module').then(m => m.UserMasterModule), canActivate: [AppGuard] },
  //plant's module
  { path: 'plant-stock', loadChildren: () => import('./plant/plant-stock/plant-stock.module').then(m => m.PlantStockModule), canActivate: [AppGuard] },
  { path: 'c-stock', loadChildren: () => import('./plant/capitalized-stock/capitalized-stock.module').then(m => m.CapitalizedStockModule), canActivate: [AppGuard] },
  //depot's modules
  { path: 'depot-aging-production', loadChildren: () => import('./depot/aging-from-production/aging-from-production.module').then(m => m.AgingFromProductionModule), canActivate: [AppGuard] },
  { path: 'depot-aging-recieved', loadChildren: () => import('./depot/aging-from-recieved/aging-from-recieved.module').then(m => m.AgingFromRecievedModule), canActivate: [AppGuard] },
  { path: 'depot-dealer-invoice', loadChildren: () => import('./depot/dealer-invoice/dealer-invoice.module').then(m => m.DealerInvoiceModule), canActivate: [AppGuard] },
  { path: 'depot-depot-invoice', loadChildren: () => import('./depot/depot-invoice/depot-invoice.module').then(m => m.DepotInvoiceModule), canActivate: [AppGuard] },
  { path: 'depot-stock', loadChildren: () => import('./depot/depot-stock/depot-stock.module').then(m => m.DepotStockModule), canActivate: [AppGuard] },
  { path: 'gr-note', loadChildren: () => import('./depot/generate-transfer-note/generate-transfer-note.module').then(m => m.GenerateTransferNoteModule), canActivate: [AppGuard] },
  { path: 'sales-return-invoice', loadChildren: () => import('./depot/sales-return-invoice/sales-return-invoice.module').then(m => m.SalesReturnInvoiceModule), canActivate: [AppGuard] },
  { path: 'depot-stock-variantWise', loadChildren: () => import('./depot/variant-depot-stock/variant-depot-stock.module').then(m => m.VariantDepotStockModule), canActivate: [AppGuard] },
  //dealer report's modules
  { path: 'r-advance', loadChildren: () => import('./dealer/report-advance/report-advance.module').then(m => m.ReportAdvanceModule), canActivate: [AppGuard] },
  { path: 'r-aging-from-production', loadChildren: () => import('./dealer/report-aging-from-production/report-aging-from-production.module').then(m => m.ReportAgingFromProductionModule), canActivate: [AppGuard] },
  { path: 'r-aging-from-recieved', loadChildren: () => import('./dealer/report-aging-from-recieved/report-aging-from-recieved.module').then(m => m.ReportAgingFromRecievedModule), canActivate: [AppGuard] },
  { path: 'r-ats', loadChildren: () => import('./dealer/report-ats/report-ats.module').then(m => m.ReportAtsModule), canActivate: [AppGuard] },
  { path: 'r-bd-sd', loadChildren: () => import('./dealer/report-bg-sd/report-bg-sd.module').then(m => m.ReportBgSdModule), canActivate: [AppGuard] },
  { path: 'r-dealer-daily-collection', loadChildren: () => import('./dealer/report-dealer-collection-dailywaise/report-dealer-collection-dailywaise.module').then(m => m.ReportDealerCollectionDailywaiseModule), canActivate: [AppGuard] },
  { path: 'r-dealer-collection', loadChildren: () => import('./dealer/report-dealer-collection-mtd/report-dealer-collection-mtd.module').then(m => m.ReportDealerCollectionMTDModule), canActivate: [AppGuard] },
  { path: 'r-dealer-stock', loadChildren: () => import('./dealer/report-dealer-stock/report-dealer-stock.module').then(m => m.ReportDealerStockModule), canActivate: [AppGuard] },
  { path: 'r-dealer-stock-variantwise', loadChildren: () => import('./dealer/report-dealer-stock-variant-wise/report-dealer-stock-variant-wise.module').then(m => m.ReportDealerStockVariantWiseModule), canActivate: [AppGuard] },
  { path: 'r-delivery', loadChildren: () => import('./dealer/report-delivery/report-delivery.module').then(m => m.ReportDeliveryModule), canActivate: [AppGuard] },
  { path: 'r-exppected-disbursement', loadChildren: () => import('./dealer/report-expected-disbursement/report-expected-disbursement.module').then(m => m.ReportExpectedDisbursementModule), canActivate: [AppGuard] },
  { path: 'r-old-tractor', loadChildren: () => import('./dealer/report-old-tractor/report-old-tractor.module').then(m => m.ReportOldTractorModule), canActivate: [AppGuard] },
  { path: 'r-retail', loadChildren: () => import('./dealer/report-retail/report-retail.module').then(m => m.ReportRetailModule), canActivate: [AppGuard] },
  { path: 'r-retail-return', loadChildren: () => import('./dealer/report-retail-return/report-retail-return.module').then(m => m.ReportRetailReturnModule), canActivate: [AppGuard] },
  { path: 'r-rts', loadChildren: () => import('./dealer/report-rts/report-rts.module').then(m => m.ReportRtsModule), canActivate: [AppGuard] },
  { path: 'r-tehsil-based', loadChildren: () => import('./dealer/report-tehsil-based/report-tehsil-based.module').then(m => m.ReportTehsilBasedModule), canActivate: [AppGuard] },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  //imports: [RouterModule.forRoot(routes,{ useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
