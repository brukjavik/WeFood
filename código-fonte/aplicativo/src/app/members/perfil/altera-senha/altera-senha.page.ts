import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { AuthenticationService } from "./../../../services/authentication.service";

@Component({
  selector: "app-altera-senha",
  templateUrl: "./altera-senha.page.html",
  styleUrls: ["./altera-senha.page.scss"],
})
export class AlteraSenhaPage implements OnInit {
  senhaa: string;

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

      let senha = { senha: this.senhaa };

      if (id.tipo === 0) {
        axios
          .put(
            "http://182fe8bf.ngrok.io/user/edit/senha/" + id.user.email,
            senha
          )
          .then((e) => console.log(e))
          .catch((e) => console.log(e));
      }

      if (id.tipo === 1) {
        axios
          .put(
            "http://182fe8bf.ngrok.io/rest/edit/senha/" + id.user.email,
            senha
          )
          .then((e) => console.log(e))
          .catch((e) => console.log(e));
      }
    });

    this.logout();
  }
}
