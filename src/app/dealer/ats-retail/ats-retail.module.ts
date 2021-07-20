import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtsRetailComponent } from './ats-retail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: '', component: AtsRetailComponent }
];

@NgModule({
  declarations: [
    AtsRetailComponent
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
export class AtsRetailModule { }
