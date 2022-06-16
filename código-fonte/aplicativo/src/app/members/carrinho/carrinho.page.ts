import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { AuthenticationService } from "./../../services/authentication.service";
import { Location, VERSION, PlatformLocation } from "@angular/common";

@Component({
  selector: "app-carrinho",
  templateUrl: "./carrinho.page.html",
  styleUrls: ["./carrinho.page.scss"],
})
export class CarrinhoPage implements OnInit {
  pedidos = [{}];
  quanti = [];
  total: any;
  objeto: {};

  constructor(
    private authService: AuthenticationService,
    private location: Location
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      axios
        .get("http://182fe8bf.ngrok.io/cart/list/" + id.user.email)
        .then((response) => {
          this.pedidos = response.data;
          //@ts-ignore
          this.total = this.pedidos.carrinho.reduce(function (a, b) {
            //@ts-ignore
            return a + b.quantidade * b.preco_venda;
          }, 0);
        });
    });
  }

  quantidade(i, quantidade) {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      axios
        .put(
          "http://182fe8bf.ngrok.io/cart/edit/" +
            id.user.email +
            "/" +
            //@ts-ignore
            this.pedidos.carrinho[i].prato_nome +
            "/" +
            quantidade
        )
        .then((response) => {
          console.log("teste");
          axios
            .get("http://182fe8bf.ngrok.io/cart/list/" + id.user.email)
            .then((response) => {
              this.pedidos = response.data;
              //@ts-ignore
              this.total = this.pedidos.carrinho.reduce(function (a, b) {
                //@ts-ignore
                return a + b.quantidade * b.preco_venda;
              }, 0);
            });
        });
    });
  }

  pedido() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      axios
        .delete("http://182fe8bf.ngrok.io/cart/buy/" + id.user.email)
        .then((response) => {
          this.location.back();
        });
    });
  }
}
