import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { PlanDeliveryPlanUploadComponent } from './plan-delivery-plan-upload.component';

const routes: Routes = [
  { path: '', component: PlanDeliveryPlanUploadComponent }
];

@NgModule({
  declarations: [
    PlanDeliveryPlanUploadComponent
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
export class PlanDeliveryPlanUploadModule { }
