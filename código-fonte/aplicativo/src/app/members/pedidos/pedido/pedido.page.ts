import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import axios from "axios";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.page.html",
  styleUrls: ["./pedido.page.scss"],
})
export class PedidoPage implements OnInit {
  id: any;
  pedido: any;
  total: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    let datarecv = this.route.snapshot.paramMap.get("numero");
    this.id = datarecv;
    console.log(this.id);

    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      console.log(id.user.email);

      axios
        .get(
          "http://182fe8bf.ngrok.io/hist/order/" + id.user.email + "/" + this.id
        )
        .then((response) => {
          this.pedido = response.data;
          this.total = this.pedido.reduce(function (a, b) {
            //@ts-ignore
            return a + b.quantidade * b.preco_venda;
          }, 0);
          console.log(this.pedido);
        });
    });
  }
}
