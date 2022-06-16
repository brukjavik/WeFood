import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { AuthenticationService } from "./../../../services/authentication.service";

@Component({
  selector: "app-altera-endereco",
  templateUrl: "./altera-endereco.page.html",
  styleUrls: ["./altera-endereco.page.scss"],
})
export class AlteraEnderecoPage implements OnInit {
  ende: string;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

  botao() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      let endereco = { endereco: this.ende };

      if (id.tipo === 0) {
        axios
          .put(
            "http://182fe8bf.ngrok.io/user/edit/endereco/" + id.user.email,
            endereco
          )
          .then((e) => console.log(e))
          .catch((e) => console.log(e));
      }

      if (id.tipo === 1) {
        axios
          .put(
            "http://182fe8bf.ngrok.io/rest/edit/endereco/" + id.user.email,
            endereco
          )
          .then((e) => console.log(e))
          .catch((e) => console.log(e));
      }

      console.log(endereco);
    });

    this.logout();
  }
}
