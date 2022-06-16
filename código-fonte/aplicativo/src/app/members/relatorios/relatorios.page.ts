import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import axios from "axios";

@Component({
  selector: "app-relatorios",
  templateUrl: "./relatorios.page.html",
  styleUrls: ["./relatorios.page.scss"],
})
export class RelatoriosPage implements OnInit {
  rela1: any;

  rela2_1: any;
  rela2_7: any;
  rela2_30: any;
  um = false;
  sete = false;
  trinta = false;

  rela3: any;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.getCurrentUser().then((id) => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token,
      };

      axios
        .get("http://182fe8bf.ngrok.io/rest/report1/" + id.user.email)
        .then((response) => {
          console.log(response.data);
          this.rela1 = response.data;

          axios
            .get(
              "http://182fe8bf.ngrok.io/rest/report2/" +
                id.user.email +
                "/" +
                "1"
            )
            .then((response) => {
              console.log(response.data);
              this.rela2_1 = response.data;

              axios
                .get(
                  "http://182fe8bf.ngrok.io/rest/report2/" +
                    id.user.email +
                    "/" +
                    "7"
                )
                .then((response) => {
                  console.log(response.data);
                  this.rela2_7 = response.data;
                  axios
                    .get(
                      "http://182fe8bf.ngrok.io/rest/report2/" +
                        id.user.email +
                        "/" +
                        "30"
                    )
                    .then((response) => {
                      console.log(response.data);
                      this.rela2_30 = response.data;

                      axios
                        .get(
                          "http://182fe8bf.ngrok.io/rest/report3/" +
                            id.user.email
                        )
                        .then((response) => {
                          console.log(response.data);
                          this.rela3 = response.data;
                        });
                    });
                });
            });
        });
    });
  }

  logout() {
    this.authService.logout();
  }

  um1() {
    console.log("1");
    this.um = true;
    this.sete = false;
    this.trinta = false;
  }

  sete7() {
    console.log("7");
    this.um = false;
    this.sete = true;
    this.trinta = false;
  }

  trinta30() {
    console.log("30");
    this.um = false;
    this.sete = false;
    this.trinta = true;
  }
}
