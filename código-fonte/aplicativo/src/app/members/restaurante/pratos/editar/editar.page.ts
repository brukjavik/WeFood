import { ActivatedRoute } from "@angular/router";
import axios from "axios";
import { AuthenticationService } from "./../../../../services/authentication.service";
import { Component, OnInit } from "@angular/core";
import { Location, VERSION, PlatformLocation } from "@angular/common";
import { Router } from "@angular/router";
import { Events } from "@ionic/angular";

@Component({
  selector: "app-editar",
  templateUrl: "./editar.page.html",
  styleUrls: ["./editar.page.scss"],
})
export class EditarPage implements OnInit {
  email: any;
  prato = {};
  nome: {};

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

      axios
        .get(
          "http://182fe8bf.ngrok.io/plate/list/" + this.email + "/" + this.nome
        )
        .then((response) => {
          this.prato = response.data;
          console.log(this.prato);
        });
    });
  }

  salvar() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      axios.put(
        "http://182fe8bf.ngrok.io/plate/edit/" + this.email + "/" + this.nome,
        this.prato
      );
    });

    this.location.back();
  }
}
