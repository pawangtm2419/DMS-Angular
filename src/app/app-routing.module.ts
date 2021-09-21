import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppGuard } from './shared/app.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AppGuard] },
  // dashboard module page
  { path: 'history-report', loadChildren: () => import('./dashboard/history-report/history-report.module').then(m => m.HistoryReportModule), canActivate: [AppGuard] },
  { path: 'vehicle-history', loadChildren: () => import('./dashboard/vehicle-history/vehicle-history.module').then(m => m.VehicleHistoryModule), canActivate: [AppGuard] },
  // master's modules
  { path: 'm-city', loadChildren: () => import('./masters/city-master/city-master.module').then(m => m.CityMasterModule), canActivate: [AppGuard] },
  { path: 'm-customer', loadChildren: () => import('./masters/customer-master/customer-master.module').then(m => m.CustomerMasterModule), canActivate: [AppGuard] },
  { path: 'm-dealer', loadChildren: () => import('./masters/dealer-master/dealer-master.module').then(m => m.DealerMasterModule), canActivate: [AppGuard] },
  { path: 'm-depot', loadChildren: () => import('./masters/depot-master/depot-master.module').then(m => m.DepotMasterModule), canActivate: [AppGuard] },
  { path: 'm-hsn-code', loadChildren: () => import('./masters/hsn-master/hsn-master.module').then(m => m.HsnMasterModule), canActivate: [AppGuard] },
  { path: 'm-financial', loadChildren: () => import('./masters/financial-master/financial-master.module').then(m => m.FinancialMasterModule), canActivate: [AppGuard] },
  { path: 'm-on-power', loadChildren: () => import('./masters/on-power-master/on-power-master.module').then(m => m.OnPowerMasterModule), canActivate: [AppGuard] },
  { path: 'm-part', loadChildren: () => import('./masters/part-master/part-master.module').then(m => m.PartMasterModule), canActivate: [AppGuard] },
  { path: 'm-roles', loadChildren: () => import('./masters/role-master/role-master.module').then(m => m.RoleMasterModule), canActivate: [AppGuard] },
  { path: 'edit-roles/:id', loadChildren: () => import('./masters/role-master/edit-role-master/edit-role-master.module').then(m => m.EditRoleMasterModule), canActivate: [AppGuard] },
  { path: 'm-state', loadChildren: () => import('./masters/state-master/state-master.module').then(m => m.StateMasterModule), canActivate: [AppGuard] },
  { path: 'm-user', loadChildren: () => import('./masters/user-master/user-master.module').then(m => m.UserMasterModule), canActivate: [AppGuard] },
  { path: 'm-transport', loadChildren: () => import('./masters/transporter-master/transporter-master.module').then(m => m.TransporterMasterModule), canActivate: [AppGuard] },
  { path: 'm-variant', loadChildren: () => import('./masters/variant-master/variant-master.module').then(m => m.VariantMasterModule), canActivate: [AppGuard] },
  { path: 'm-zone', loadChildren: () => import('./masters/zone-master/zone-master.module').then(m => m.ZoneMasterModule), canActivate: [AppGuard] },
  { path: 'm-user', loadChildren: () => import('./masters/user-master/user-master.module').then(m => m.UserMasterModule), canActivate: [AppGuard] },
  // plant's module
  { path: 'plant-stock', loadChildren: () => import('./plant/plant-stock/plant-stock.module').then(m => m.PlantStockModule), canActivate: [AppGuard] },
  { path: 'c-stock', loadChildren: () => import('./plant/capitalized-stock/capitalized-stock.module').then(m => m.CapitalizedStockModule), canActivate: [AppGuard] },
  // depot's modules
  { path: 'depot-aging-production', loadChildren: () => import('./depot/aging-from-production/aging-from-production.module').then(m => m.AgingFromProductionModule), canActivate: [AppGuard] },
  { path: 'depot-aging-recieved', loadChildren: () => import('./depot/aging-from-recieved/aging-from-recieved.module').then(m => m.AgingFromRecievedModule), canActivate: [AppGuard] },
  { path: 'depot-dealer-invoice', loadChildren: () => import('./depot/dealer-invoice/dealer-invoice.module').then(m => m.DealerInvoiceModule), canActivate: [AppGuard] },
  { path: 'depot-depot-invoice', loadChildren: () => import('./depot/depot-invoice/depot-invoice.module').then(m => m.DepotInvoiceModule), canActivate: [AppGuard] },
  { path: 'depot-stock', loadChildren: () => import('./depot/depot-stock/depot-stock.module').then(m => m.DepotStockModule), canActivate: [AppGuard] },
  { path: 'gr-note', loadChildren: () => import('./depot/generate-transfer-note/generate-transfer-note.module').then(m => m.GenerateTransferNoteModule), canActivate: [AppGuard] },
  { path: 'sales-return-invoice', loadChildren: () => import('./depot/sales-return-invoice/sales-return-invoice.module').then(m => m.SalesReturnInvoiceModule), canActivate: [AppGuard] },
  { path: 'viewd-depot-invoice/:id', loadChildren: () => import('./depot/viewd-depot-invoice/viewd-depot-invoice.module').then(m => m.ViewdDepotInvoiceModule), canActivate: [AppGuard] },
  { path: 'depot-stock-variantWise', loadChildren: () => import('./depot/variant-depot-stock/variant-depot-stock.module').then(m => m.VariantDepotStockModule), canActivate: [AppGuard] },
  // dealer report's modules
  { path: 'r-advance', loadChildren: () => import('./dealer/report-advance/report-advance.module').then(m => m.ReportAdvanceModule), canActivate: [AppGuard] },
  { path: 'r-aging-from-production', loadChildren: () => import('./dealer/report-aging-from-production/report-aging-from-production.module').then(m => m.ReportAgingFromProductionModule), canActivate: [AppGuard] },
  { path: 'r-dealer-collection-statewise', loadChildren: () => import('./dealer/report-dealer-collection-mtd/dealer-collection-statewise/dealer-collection-statewise.module').then(m => m.DealerCollectionStatewiseModule), canActivate: [AppGuard] },
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
  // return page modules
  { path: 'advance-return', loadChildren: () => import('./dealer/return-advance/return-advance.module').then(m => m.ReturnAdvanceModule), canActivate: [AppGuard] },
  { path: 'retail-return', loadChildren: () => import('./dealer/return-retail/return-retail.module').then(m => m.ReturnRetailModule), canActivate: [AppGuard] },
  { path: 'sales-return', loadChildren: () => import('./dealer/return-sales/return-sales.module').then(m => m.ReturnSalesModule), canActivate: [AppGuard] },
  // ats page in dealer module
  { path: 'ats-delivery', loadChildren: () => import('./dealer/ats-delivery/ats-delivery.module').then(m => m.AtsDeliveryModule), canActivate: [AppGuard] },
  { path: 'advanceDeliveryDetails/:id', loadChildren: () => import('./dealer/ats-delivery/advance-delivery-details/advance-delivery-details.module').then(m => m.AdvanceDeliveryDetailsModule), canActivate: [AppGuard] },
  { path: 'ats-insurance', loadChildren: () => import('./dealer/ats-insurance/ats-insurance.module').then(m => m.AtsInsuranceModule), canActivate: [AppGuard] },
  { path: 'ats-retail', loadChildren: () => import('./dealer/ats-retail/ats-retail.module').then(m => m.AtsRetailModule), canActivate: [AppGuard] },
  { path: 'customerTrackingSheet/:id', loadChildren: () => import('./dealer/ats-retail/customer-tracking-sheet/customer-tracking-sheet.module').then(m => m.CustomerTrackingSheetModule), canActivate: [AppGuard] },
  // bgs /page in dealer module
  { path: 'bgs-report', loadChildren: () => import('./dealer/bgs/bgs.module').then(m => m.BgsModule), canActivate: [AppGuard] },
  // invoice page in dealer module
  { path: 'invoices', loadChildren: () => import('./dealer/invoice/invoice.module').then(m => m.InvoiceModule), canActivate: [AppGuard] },
  { path: 'invoices-mtd', loadChildren: () => import('./dealer/invoice-mtd/invoice-mtd.module').then(m => m.InvoiceMtdModule), canActivate: [AppGuard] },
  // plan page in dealer module
  { path: 'r-collection-plan', loadChildren: () => import('./dealer/plan-collection-plan-report/plan-collection-plan-report.module').then(m => m.PlanCollectionPlanReportModule), canActivate: [AppGuard] },
  { path: 'upload-collection-plan', loadChildren: () => import('./dealer/plan-collection-plan-upload/plan-collection-plan-upload.module').then(m => m.PlanCollectionPlanUploadModule), canActivate: [AppGuard] },
  { path: 'r-delivery-plan', loadChildren: () => import('./dealer/plan-delivery-plan-report/plan-delivery-plan-report.module').then(m => m.PlanDeliveryPlanReportModule), canActivate: [AppGuard] },
  { path: 'upload-delivery-plan', loadChildren: () => import('./dealer/plan-delivery-plan-upload/plan-delivery-plan-upload.module').then(m => m.PlanDeliveryPlanUploadModule), canActivate: [AppGuard] },
  { path: 'r-retail-plan', loadChildren: () => import('./dealer/plan-retail-plan-report/plan-retail-plan-report.module').then(m => m.PlanRetailPlanReportModule), canActivate: [AppGuard] },
  { path: 'upload-retail-plan', loadChildren: () => import('./dealer/plan-retail-plan-upload/plan-retail-plan-upload.module').then(m => m.PlanRetailPlanUploadModule), canActivate: [AppGuard] },
  { path: 'r-sale-plan', loadChildren: () => import('./dealer/plan-sale-plan-report/plan-sale-plan-report.module').then(m => m.PlanSalePlanReportModule), canActivate: [AppGuard] },
  { path: 'upload-sale-plan', loadChildren: () => import('./dealer/plan-sale-plan-upload/plan-sale-plan-upload.module').then(m => m.PlanSalePlanUploadModule), canActivate: [AppGuard] },
  // dealer collection page module
  { path: 'monthly-statement', loadChildren: () => import('./dealer/monthly-statement/monthly-statement.module').then(m => m.MonthlyStatementModule), canActivate: [AppGuard] },
  { path: 'opening-closing-sheet', loadChildren: () => import('./dealer/opening-closing-sheet/opening-closing-sheet.module').then(m => m.OpeningClosingSheetModule), canActivate: [AppGuard] },
  { path: 'statement-upload', loadChildren: () => import('./dealer/statement-upload/statement-upload.module').then(m => m.StatementUploadModule), canActivate: [AppGuard] },
  // dealer module page
  { path: 'sale-return-receipt', loadChildren: () => import('./dealer/sale-return-receipt-list/sale-return-receipt-list.module').then(m => m.SaleReturnReceiptListModule), canActivate: [AppGuard] },
  { path: 'change-pass', loadChildren: () => import('./user/change-pass/change-pass.module').then(m => m.ChangePassModule), canActivate: [AppGuard] },
  { path: 'closing-date', loadChildren: () => import('./user/close-date/close-date.module').then(m => m.CloseDateModule), canActivate: [AppGuard] },
  { path: 'update-vehicle', loadChildren: () => import('./user/update-vehicle/update-vehicle.module').then(m => m.UpdateVehicleModule), canActivate: [AppGuard] },
  { path: 'user-profile', loadChildren: () => import('./user/user-profile/user-profile.module').then(m => m.UserProfileModule), canActivate: [AppGuard] },
  // page not found
  { path: '', loadChildren: () => import('./user/login/login.module').then(m => m.LoginModule) },
  { path: 'forget-password', loadChildren: () => import('./user/forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  // imports: [RouterModule.forRoot(routes,{ useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
