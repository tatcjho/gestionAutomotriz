import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions/promotions.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [{path: '', component: PromotionsComponent}]



@NgModule({
  declarations: [PromotionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule
  ]
})
export class PromotionsModule { }
