import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayRequestComponent } from './pay-request/pay-request/pay-request.component';
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from '@kolkov/angular-editor';
const routes: Routes = [{ path: "", component: PayRequestComponent }];

@NgModule({
  declarations: [PayRequestComponent],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    AngularEditorModule
  ]
})
export class PayRequestModule { }
