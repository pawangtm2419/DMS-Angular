import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateTransferNoteComponent } from './generate-transfer-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipePipe } from 'src/app/shared/pipe.pipe';

const routes: Routes = [
  { path: '', component: GenerateTransferNoteComponent }
];

@NgModule({
  declarations: [
    GenerateTransferNoteComponent,
    PipePipe
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
export class GenerateTransferNoteModule { }
