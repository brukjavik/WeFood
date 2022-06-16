import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email: string;
  senha: string;
  check: string;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  login() {
    if (this.email === "" || this.email === undefined) {
      this.check = "* Insira um E-mail válido";
    } else if (this.senha === "" || this.senha === undefined) {
      this.check = "* Insira uma senha válida";
    } else {
      this.authService.login(this.email, this.senha);
    }
  }
}
