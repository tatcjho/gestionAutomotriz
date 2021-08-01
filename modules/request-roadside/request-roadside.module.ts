import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestRoadsideComponent } from './request-roadside/request-roadside/request-roadside.component';
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
const routes: Routes = [{ path: "", component: RequestRoadsideComponent }];




@NgModule({
  declarations: [RequestRoadsideComponent],
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
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
    
  ],
})
export class RequestRoadsideModule { }
