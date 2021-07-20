import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnAdvanceComponent } from './return-advance.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ReturnAdvanceComponent }
];

@NgModule({
  declarations: [
    ReturnAdvanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReturnAdvanceModule { }
