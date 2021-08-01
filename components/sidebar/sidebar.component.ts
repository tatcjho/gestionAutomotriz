import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthServiceService } from "app/services/authService/auth-service.service";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path : "/promotions" , title: "Promociones" , icon:"savings" , class: "" }, 
  { path: "/products", title: "Productos", icon: "view_module", class: "" },
  { path: "/services", title: "Servicios", icon: "design_services", class: "" },
  { path: "/news", title: "Noticias", icon: "web", class: "" }, 
  { path: "/notifications", title: "Notificaciones", icon: "add_alert", class: "" },
  { path: "/roadside-assistence", title: "Asistencia Vial", icon: "toys", class: "" },
  { path: "/request-roadside-assistence", title: "Solicitud Asistencia Vial", icon: "toys", class: "" },
  { path: "/pay-request", title: "Solicitud de Pago", icon: "payment", class: "" }, 
  { path: "/branchOffices", title: "Sucursales", icon: "store", class: "" }, 
  { path: "/messages", title: "Mensajes", icon: "local_post_office", class: "" }, 
  { path: "/users-list", title: "Usuarios", icon: "people", class: "" },


  // { path: "/socialHelp", title: "Ayuda social", icon: "person", class: "" },
  // {
  //   path: "/notifications",
  //   title: "Notificaciones",
  //   icon: "mark_chat_unread",
  //   class: "",
  // },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  private infoUser: any;
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.infoUser = JSON.parse(localStorage.getItem("infoUser"));
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  public async logout() {
    await this.authService.logout();
    this.router.navigate([""]);
  }
}
