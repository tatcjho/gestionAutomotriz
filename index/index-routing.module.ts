import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './homePage/index.component';
import { Routes } from '@angular/router';


export const IndexRoutingModule: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: IndexComponent,
      },
    ] 
  },
];
