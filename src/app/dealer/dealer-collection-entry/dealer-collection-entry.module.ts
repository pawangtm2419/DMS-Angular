import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { DealerCollectionEntryComponent } from './dealer-collection-entry.component';

const routes: Routes = [
  { path: '', component: DealerCollectionEntryComponent }
];

@NgModule({
  declarations: [
    DealerCollectionEntryComponent
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
export class DealerCollectionEntryModule { }
