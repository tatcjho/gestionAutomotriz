import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [



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

 
}
