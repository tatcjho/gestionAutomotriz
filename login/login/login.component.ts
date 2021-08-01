import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
/** INTERFACE */

/** SERVICE */
import { AuthServiceService } from "app/services/authService/auth-service.service";
import { Users } from "app/interfaces/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public user: Users;
  
  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.user = {};
  }

  /**
   * *** Funcion para validar e iniciar sesion ***
   * @param user 
   * @param valid 
   */
  public onLogin(user: Users, valid: boolean) {
    if (valid) {
      this.authService.login(this.user.user_email, this.user.user_password);
    }
  }
}
