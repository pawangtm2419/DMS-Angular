import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReturnSalesComponent } from './return-sales.component';

const routes: Routes = [
  { path: '', component: ReturnSalesComponent }
];

@NgModule({
  declarations: [
    ReturnSalesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReturnSalesModule { }
