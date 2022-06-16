import { AuthenticationService } from "../../services/authentication.service";
import { Component, OnInit } from "@angular/core";
import axios from "axios";

@Component({
  selector: "app-pedidos",
  templateUrl: "./pedidos.page.html",
  styleUrls: ["./pedidos.page.scss"],
})
export class PedidosPage implements OnInit {
  tipo: {};
  id: any;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      this.tipo = id.tipo;

      console.log(id.user.email);

      axios
        .get("http://182fe8bf.ngrok.io/hist/order/" + id.user.email)
        .then((response) => {
          this.id = response.data;
          console.log(this.id);
        });
    });
  }

  logout() {
    this.authService.logout();
  }
}
