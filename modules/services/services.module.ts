import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services/services/services.component';
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: ServicesComponent }];


@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ServicesModule { }
