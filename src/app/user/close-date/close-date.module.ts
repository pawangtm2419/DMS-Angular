import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CloseDateComponent } from './close-date.component';

const routes: Routes = [
  { path: '', component: CloseDateComponent }
];

@NgModule({
  declarations: [
    CloseDateComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CloseDateModule { }
