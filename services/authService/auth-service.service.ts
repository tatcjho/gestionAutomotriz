import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import { Users } from "app/interfaces/user";
declare var $: any;

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  public infoUser: Users;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private fb: AngularFirestore
  ) {}

  /**
   * *** Funcion para inicio de sesion ***
   * @param email
   * @param password
   */
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      let user_info: any;
    
      user_info = (await this.getUserByEmail(email)).pipe(take(1)).toPromise();
      console.log(user_info);
      if (await user_info) {
        var infoUser = {
          user_email: (await user_info)["user_email"],
          user_uid: (await user_info)["user_uid"],
        };
        localStorage.setItem("infoUser", JSON.stringify(infoUser));
        this.infoUser = JSON.parse(localStorage.getItem("infoUser"));
        // $("#modal-login").modal("hide");
        console.log(this.infoUser.user_email)
        if (this.infoUser.user_email == "vazsegurosapp@gmail.com") {
          // *** SI ES SUPER ADMIN ***/
          this.router.navigate(["/promotions"]);
          console.log("pilas admin")
        } else{
          Swal.fire(
            "Atención",
            "Usted no es administrador",
            "error"
          );
        }
      
      }
  } catch(error) {
    if (error.code === "auth/wrong-password") {
      Swal.fire(
        "Atención",
        "La contraseña no es válida o el usuario no tiene una contraseña",
        "error"
      );
    }
    if (error.code === "auth/user-not-found") {
      Swal.fire(
        "Atención",
        "No hay registro de usuario correspondiente a este email. El usuario puede haber sido eliminado",
        "error"
      );
    }
    if (error.code === "auth/invalid-email") {
      Swal.fire("Atención", "El email no tiene un formato válido.", "error");
    }
    if (error.code === "auth/too-many-requests") {
      Swal.fire(
        "Atención",
        "Demasiados intentos de inicio de sesión fallidos.",
        "error"
      );
    }
  }
}


  /**
   * *** Funcion para Cerrar sesion ***
   */
  async logout() {
    await this.afAuth.signOut();
    localStorage.clear();
    this.router.navigate([""]);
  }

  /**
   * *** Devuelve la info del usuario ***
   * @param email
   */
  async getUserByEmail(email: string) {
    let result = this.fb.collection<Users>("users").doc(`${email}`).valueChanges();
    return result;
  }
}
