import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { AuthenticationService } from "./../../../services/authentication.service";

@Component({
  selector: "app-altera-nome",
  templateUrl: "./altera-nome.page.html",
  styleUrls: ["./altera-nome.page.scss"],
})
export class AlteraNomePage implements OnInit {
  nomee: string;

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

      let nome = { nome: this.nomee };

      console.log(nome);

      if (id.tipo === 0) {
        axios
          .put("http://182fe8bf.ngrok.io/user/edit/nome/" + id.user.email, nome)
          .then((e) => console.log(e))
          .catch((e) => console.log(e));
      }

      if (id.tipo === 1) {
        axios
          .put("http://182fe8bf.ngrok.io/rest/edit/nome/" + id.user.email, nome)
          .then((e) => console.log(e))
          .catch((e) => console.log(e));
      }
    });

    this.logout();
  }
}
