import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantStockComponent } from './plant-stock/plant-stock.component';
import { CapitalizedStockComponent } from './capitalized-stock/capitalized-stock.component';
import { AppGuard } from '../shared/app.guard';

const routes: Routes = [
  { path: 'stock', component: PlantStockComponent, canActivate: [AppGuard] },
  { path: 'cStock', component: CapitalizedStockComponent, canActivate: [AppGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantRoutingModule { }
