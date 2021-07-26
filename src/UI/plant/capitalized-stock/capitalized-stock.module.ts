import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapitalizedStockComponent } from './capitalized-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: '', component: CapitalizedStockComponent }
];

@NgModule({
  declarations: [
    CapitalizedStockComponent
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CapitalizedStockModule { }
