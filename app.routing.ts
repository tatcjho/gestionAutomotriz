import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './modules/principal/principal/principal.component';
import { MantenimientoComponent } from './modules/mantenimiento/mantenimiento/mantenimiento.component';
import { StockComponent } from './modules/stock/stock/stock.component';
import { RrhhComponent } from './modules/rrhh/rrhh/rrhh.component';
import { HistorialComponent } from './modules/historial/historial/historial.component';
import { CostosComponent } from './modules/costos/costos/costos.component';

const routes: Routes =[
  {
    path: "",
    loadChildren: "./index/index.module#IndexModule",
  },
  //{ path: "activos", component: ActivosComponent },
  { path: "principal", component: PrincipalComponent },
  { path: "mantenimiento", component: MantenimientoComponent },
  { path: "gestion_stock", component: StockComponent },
  { path: "recursos_humanos", component: RrhhComponent },
  { path: "historial_mantenimiento", component: HistorialComponent },
  { path: "gestion_costos", component: CostosComponent },
  {
    path: 'activos',
    loadChildren: './modules/activos/activos.module#ActivosModule',
  },
  {
    path: 'cmr',
    loadChildren: './modules/cmr/cmr.module#CMRModule',
  },
  {
    path: 'rm',
    loadChildren: './modules/rm/rm.module#RmModule',
  },
  {
    path: 'fc',
    loadChildren: './modules/fc/fc.module#FcModule',
  },


  

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
