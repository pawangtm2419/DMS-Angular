import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtsInsuranceComponent } from './ats-insurance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: '', component: AtsInsuranceComponent }
];

@NgModule({
  declarations: [
    AtsInsuranceComponent
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
export class AtsInsuranceModule { }
