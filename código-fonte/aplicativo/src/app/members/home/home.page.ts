import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { Location, VERSION } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  restaurantes = [{}];
  promos = [{}];
  usuario = {};
  tipo = {};
  rest = {};
  pratos = [{}];
  email: any;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      this.usuario = id.user;
      this.tipo = id.tipo;
      this.email = id.user.email;

      if (this.tipo === 0) {
        axios
          .get(
            "http://182fe8bf.ngrok.io/rest/list/undefined/undefined/undefined/false/false/true"
          )
          .then((response) => {
            this.restaurantes = response.data;
            console.log(response.data);
            axios
              .get(
                "http://182fe8bf.ngrok.io/rest/list/undefined/undefined/undefined/true/false/false"
              )
              .then((response) => {
                this.promos = response.data;
                console.log(response.data);
              });
          });
      } else if (this.tipo === 1) {
        axios
          .get("http://182fe8bf.ngrok.io/rest/list/" + id.user.email)
          .then((response) => {
            this.rest = response.data;

            axios
              .get("http://182fe8bf.ngrok.io/plate/list/" + id.user.email)
              .then((response) => {
                this.pratos = response.data;
              });
          });
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  entrega(entrega) {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };
      if (entrega === 1) {
        console.log("zero");

        axios
          .put(
            "http://182fe8bf.ngrok.io/rest/edit/delivery/" +
              this.email +
              "/" +
              0
          )
          .then((response) => {
            axios
              .get("http://182fe8bf.ngrok.io/rest/list/" + id.user.email)
              .then((response) => {
                this.rest = response.data;

                axios
                  .get("http://182fe8bf.ngrok.io/plate/list/" + id.user.email)
                  .then((response) => {
                    this.pratos = response.data;
                  });
              });
          });
      }

      if (entrega === 0) {
        console.log("um");

        axios
          .put(
            "http://182fe8bf.ngrok.io/rest/edit/delivery/" +
              this.email +
              "/" +
              1
          )
          .then((response) => {
            axios
              .get("http://182fe8bf.ngrok.io/rest/list/" + id.user.email)
              .then((response) => {
                this.rest = response.data;

                axios
                  .get("http://182fe8bf.ngrok.io/plate/list/" + id.user.email)
                  .then((response) => {
                    this.pratos = response.data;
                  });
              });
          });
      }
    });
  }

  funci(funci) {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };
      if (funci === 1) {
        console.log("zero");

        axios
          .put(
            "http://182fe8bf.ngrok.io/rest/edit/open/" + this.email + "/" + 0
          )
          .then((response) => {
            axios
              .get("http://182fe8bf.ngrok.io/rest/list/" + id.user.email)
              .then((response) => {
                this.rest = response.data;

                axios
                  .get("http://182fe8bf.ngrok.io/plate/list/" + id.user.email)
                  .then((response) => {
                    this.pratos = response.data;
                  });
              });
          });
      }

      if (funci === 0) {
        console.log("um");

        axios
          .put(
            "http://182fe8bf.ngrok.io/rest/edit/open/" + this.email + "/" + 1
          )
          .then((response) => {
            axios
              .get("http://182fe8bf.ngrok.io/rest/list/" + id.user.email)
              .then((response) => {
                this.rest = response.data;

                axios
                  .get("http://182fe8bf.ngrok.io/plate/list/" + id.user.email)
                  .then((response) => {
                    this.pratos = response.data;
                  });
              });
          });
      }
    });
  }
}
