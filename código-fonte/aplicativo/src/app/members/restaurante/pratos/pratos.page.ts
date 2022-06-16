import { ActivatedRoute } from "@angular/router";
import axios from "axios";
import { AuthenticationService } from "./../../../services/authentication.service";
import { Component, OnInit } from "@angular/core";
import { Location, VERSION } from "@angular/common";
import { Router } from "@angular/router";
import { Events } from "@ionic/angular";

@Component({
  selector: "app-pratos",
  templateUrl: "./pratos.page.html",
  styleUrls: ["./pratos.page.scss"],
})
export class PratosPage implements OnInit {
  email: any;
  nome: any;
  prato = {};
  quantidade = 1;
  tipo = {};
  carrinho = {};

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private location: Location
  ) {}

  ngOnInit() {
    let datarecv = this.route.snapshot.paramMap.get("email");
    this.email = datarecv;
    datarecv = this.route.snapshot.paramMap.get("nome");
    this.nome = datarecv;

    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      this.tipo = id.tipo;

      axios
        .get(
          "http://182fe8bf.ngrok.io/plate/list/" + this.email + "/" + this.nome
        )
        .then((response) => {
          this.prato = response.data;
        });
    });
  }

  editarPrato() {}

  excluirPrato() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      this.tipo = id.tipo;

      axios.delete(
        "http://182fe8bf.ngrok.io/plate/delete/" + this.email + "/" + this.nome
      );
    });

    this.location.back();
  }

  addQuant() {
    this.quantidade = this.quantidade + 1;
  }

  subQuant() {
    this.quantidade = this.quantidade - 1;
    if (this.quantidade <= 1) this.quantidade = 1;
  }

  adicionaCarrinho() {
    this.carrinho = {
      prato: this.nome,
      email: this.email,
      //@ts-ignore
      preco: this.prato.preco,
      quantidade: this.quantidade,
    };

    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      axios.post(
        "http://182fe8bf.ngrok.io/cart/add/" + id.user.email,
        this.carrinho
      );
    });

    this.location.back();
  }
}
