import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReturnRetailComponent } from './return-retail.component';

const routes: Routes = [
  { path: '', component: ReturnRetailComponent }
];

@NgModule({
  declarations: [
    ReturnRetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReturnRetailModule { }
