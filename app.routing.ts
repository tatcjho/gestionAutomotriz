import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'app/login/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { TermsConditionsComponent } from './pages/terms-condiditions/terms-conditions/terms-conditions.component';
import { ActivosComponent } from './modules/activos/activos/activos.component';
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





  { path: "login", component: LoginComponent },
  { path: "terms-conditions", component: TermsConditionsComponent },
  
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
     
      {
        path: 'promotions',
        loadChildren: './modules/promotions/promotions.module#PromotionsModule',
      },
      {
        path: 'products',
        loadChildren: './modules/products/products.module#ProductsModule',
      },
      {
        path: 'services',
        loadChildren: './modules/services/services.module#ServicesModule',
      },
      {
        path: 'news',
        loadChildren: './modules/news/news.module#NewsModule',
      },
      {
        path: 'notifications',
        loadChildren: './modules/notifications/notifications.module#NotificationsModule',
      },
      {
        path: 'roadside-assistence',
        loadChildren: './modules/roadside-assistence/roadside-assistence.module#RoadsideAssistenceModule',
      },
      {
        path: 'request-roadside-assistence',
        loadChildren: './modules/request-roadside/request-roadside.module#RequestRoadsideModule',
      },
      {
        path: 'branchOffices',
        loadChildren: './modules/branch-offices/branch-offices.module#BranchOfficesModule',
      },
      {
        path: 'users-list',
        loadChildren: './modules/users-list/users-list.module#UsersListModule',
      },
      {
        path: 'messages',
        loadChildren: './modules/messages/messages.module#MessagesModule',
      },
      {
        path: 'pay-request',
        loadChildren: './modules/pay-request/pay-request.module#PayRequestModule',
      },

    ],
  },
  {path:'payment', component: PaymentComponent}

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
