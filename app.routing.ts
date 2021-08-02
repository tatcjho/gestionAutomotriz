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
  // { path: "gestion_stock", component: StockComponent },
  //{ path: "recursos_humanos", component: RrhhComponent },
  //{ path: "historial_mantenimiento", component: HistorialComponent },
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
  {
    path: 'gestion_stock',
    loadChildren: './modules/stock/stock.module#StockModule',
  },
  {
    path: 'recursos_humanos',
    loadChildren: './modules/rrhh/rrhh.module#RrhhModule',
  },

  {
    path: 'gestion_stock',
    loadChildren: './modules/stock/stock.module#StockModule',
  },
  {
    path: 'costos_mantenimiento',
    loadChildren: './modules/costos-mantenimiento/costos-mantenimiento.module#CostosMantenimientoModule',
  },
  {
    path: 'mano_obra',
    loadChildren: './modules/mano/mano.module#ManoModule',
  },
  {
    path: 'historial_mantenimiento',
    loadChildren: './modules/historial/historial.module#HistorialModule',
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
