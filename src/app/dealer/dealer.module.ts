import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelaerStockVariantwiseComponent } from './delaer-stock-variantwise/delaer-stock-variantwise.component';
import { DelaerStockComponent } from './delaer-stock/delaer-stock.component';
import { DelaerCollectionMTDComponent } from './delaer-collection-mtd/delaer-collection-mtd.component';
import { DelaerCollectionDaywiseComponent } from './delaer-collection-daywise/delaer-collection-daywise.component';
import { RetailReportComponent } from './retail-report/retail-report.component';
import { RetailReturnReportComponent } from './retail-return-report/retail-return-report.component';
import { AdvanceReportComponent } from './advance-report/advance-report.component';
import { BgSdReportComponent } from './bg-sd-report/bg-sd-report.component';



@NgModule({
  declarations: [
    DelaerStockComponent,
    DelaerStockVariantwiseComponent,
    DelaerCollectionMTDComponent,
    DelaerCollectionDaywiseComponent,
    RetailReportComponent,
    RetailReturnReportComponent,
    AdvanceReportComponent,
    BgSdReportComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DealerModule { }
