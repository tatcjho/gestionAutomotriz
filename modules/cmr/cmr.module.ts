import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmrComponent } from './cmr/cmr.component';
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatTableExporterModule } from 'mat-table-exporter';


const routes: Routes = [{ path: "", component: CmrComponent }];



@NgModule({
  declarations: [CmrComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    AngularEditorModule,
    MatTableExporterModule,

  ]
})
export class CMRModule { }
