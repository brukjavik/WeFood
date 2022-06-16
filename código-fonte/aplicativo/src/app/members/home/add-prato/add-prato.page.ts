import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import axios from "axios";
import { AuthenticationService } from "./../../../services/authentication.service";
import { Location, VERSION, PlatformLocation } from "@angular/common";
import { Router } from "@angular/router";
import { Events } from "@ionic/angular";

@Component({
  selector: "app-add-prato",
  templateUrl: "./add-prato.page.html",
  styleUrls: ["./add-prato.page.scss"],
})
export class AddPratoPage implements OnInit {
  email: any;
  prato = {};
  nome: {};

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private location: Location
  ) {}

  ngOnInit() {}

  salvar() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      axios.post(
        "http://182fe8bf.ngrok.io/plate/add/" + id.user.email,
        this.prato
      );
    });

    this.location.back();
  }
}
