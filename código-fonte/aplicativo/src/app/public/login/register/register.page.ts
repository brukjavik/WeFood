import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import axios from "axios";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
  categoria: string;
  check: string;
  teste = true;

  constructor(private location: Location) {}

  ngOnInit() {}

  chamaRegistroCliente() {
    if (this.nome === "" || this.nome === undefined) {
      this.check = "* Insira um nome válido";
    } else if (this.email === "" || this.email === undefined) {
      this.check = "* Insira um E-mail válido";
    } else if (this.senha === "" || this.senha === undefined) {
      this.check = "* Insira uma senha válida";
    } else if (this.endereco === "" || this.endereco === undefined) {
      this.check = "* Insira um endereço válido";
    } else {
      this.location.back();
    }
    axios.post("http://182fe8bf.ngrok.io/auth/user/register", {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      endereco: this.endereco,
    });
  }

  chamaRegistroRestaurante() {
    if (this.nome === "" || this.nome === undefined) {
      this.check = "* Insira um nome válido";
    } else if (this.email === "" || this.email === undefined) {
      this.check = "* Insira um E-mail válido";
    } else if (this.senha === "" || this.senha === undefined) {
      this.check = "* Insira uma senha válida";
    } else if (this.endereco === "" || this.endereco === undefined) {
      this.check = "* Insira um endereço válido";
    } else if (this.categoria === "" || this.categoria === undefined) {
      this.check = "* Insira uma categoria válida";
    } else {
      axios.post("http://182fe8bf.ngrok.io/auth/rest/register", {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        endereco: this.endereco,
        categoria: this.categoria,
      });

      this.location.back();
    }
  }

  chama() {
    this.teste = !this.teste;
  }
}
