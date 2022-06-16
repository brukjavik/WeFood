import { Component, OnInit } from "@angular/core";
import { HomePage } from "../home/home.page";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "./../../services/authentication.service";
import axios from "axios";
import { Events } from "@ionic/angular";

@Component({
  selector: "restaurante",
  templateUrl: "./restaurante.page.html",
  styleUrls: ["./restaurante.page.scss"],
})
export class RestaurantePage implements OnInit {
  restaurante: any;

  rest = {};
  pratos = [{}];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private event: Events
  ) {}

  ngOnInit() {
    let datarecv = this.route.snapshot.paramMap.get("name");
    this.restaurante = datarecv;

    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      axios
        .get("http://182fe8bf.ngrok.io/rest/list/" + this.restaurante)
        .then((response) => {
          this.rest = response.data;

          axios
            .get("http://182fe8bf.ngrok.io/plate/list/" + this.restaurante)
            .then((response) => {
              this.pratos = response.data;
            });
        });
    });
  }
}
