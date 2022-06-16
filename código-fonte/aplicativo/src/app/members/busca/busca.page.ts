import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit } from "@angular/core";
import axios from "axios";

@Component({
  selector: "app-busca",
  templateUrl: "./busca.page.html",
  styleUrls: ["./busca.page.scss"],
})
export class BuscaPage implements OnInit {
  busca: string;
  restaurantes = [{}];
  categoria: string;
  entrega: string;
  obj = {};
  rapida = false;
  gratis = false;
  filter = false;
  promo = false;
  mais = false;
  popular = false;
  restau = true;
  item = false;
  tipo = {};

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      this.tipo = id.tipo;

      axios
        .get(
          "http://182fe8bf.ngrok.io/rest/list/undefined/undefined/undefined/false/false/false"
        )
        .then((response) => {
          this.restaurantes = response.data;
        });
    });
  }

  filtro() {
    if (this.restau === true) {
      if (this.busca === "") this.busca = undefined;
      if (this.rapida === false && this.gratis === false)
        this.entrega = undefined;
      if (this.rapida === true) this.entrega = "1";
      if (this.gratis === true) this.entrega = "0";

      this.authService.getCurrentUser().then((id) => {
        axios.defaults.headers.common = {
          Authorization: "Bearer " + id.token,
        };

        axios
          .get(
            "http://182fe8bf.ngrok.io/rest/list/" +
              this.busca +
              "/" +
              this.categoria +
              "/" +
              this.entrega +
              "/" +
              this.promo +
              "/" +
              this.popular +
              "/" +
              this.mais
          )
          .then((response) => {
            this.restaurantes = response.data;
          });
      });
    }
    if (this.item === true) {
      this.authService.getCurrentUser().then((id) => {
        axios.defaults.headers.common = {
          Authorization: "Bearer " + id.token,
        };

        axios
          .get("http://182fe8bf.ngrok.io/rest/list/food/" + this.busca)
          .then((response) => {
            this.restaurantes = response.data;
          });
      });
    }
  }

  limpaFiltro() {
    this.rapida = this.gratis = this.promo = this.popular = this.mais = false;
    this.categoria = undefined;
  }

  editEntrega() {
    if (this.rapida === true) this.gratis = !this.rapida;
  }

  editEntrega2() {
    if (this.gratis === true) this.rapida = !this.gratis;
  }

  edit() {
    if (this.restau === true) this.item = !this.restau;
  }

  edit2() {
    if (this.item === true) this.restau = !this.item;
  }

  logout() {
    this.authService.logout();
  }
}
