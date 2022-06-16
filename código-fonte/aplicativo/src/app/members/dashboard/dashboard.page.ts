import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import axios from "axios";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  tipo: {};

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      this.tipo = id.tipo;
    });
  }
}
