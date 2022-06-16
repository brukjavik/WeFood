import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { ActivatedRoute } from "@angular/router";
import { Location, VERSION } from "@angular/common";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage implements OnInit {
  tipo: {};
  email: any;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      this.tipo = id.tipo;
      this.email = id.user.email;
    });
  }

  logout() {
    this.authService.logout();
  }

  excluirContaUSER() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      axios.delete("http://182fe8bf.ngrok.io/user/delete/" + this.email);
    });

    this.logout();
  }

  excluirContaREST() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      axios.delete("http://182fe8bf.ngrok.io/rest/delete/" + this.email);
    });

    this.logout;
  }
}
