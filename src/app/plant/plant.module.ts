import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantRoutingModule } from './plant-routing.module';
import { PlantStockComponent } from './plant-stock/plant-stock.component';
import { CapitalizedStockComponent } from './capitalized-stock/capitalized-stock.component';


@NgModule({
  declarations: [
    PlantStockComponent,
    CapitalizedStockComponent
  ],
  imports: [
    CommonModule,
    PlantRoutingModule
  ]
})
export class PlantModule { }
