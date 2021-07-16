import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantDepotStockComponent } from './variant-depot-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: '', component: VariantDepotStockComponent }
];

@NgModule({
  declarations: [
    VariantDepotStockComponent
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class VariantDepotStockModule { }
