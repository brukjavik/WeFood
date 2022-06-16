import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardPage } from "./dashboard.page";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("../home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: "busca",
        loadChildren: () =>
          import("../busca/busca.module").then((m) => m.BuscaPageModule),
      },
      {
        path: "pedidos",
        loadChildren: () =>
          import("../pedidos/pedidos.module").then((m) => m.PedidosPageModule),
      },
      {
        path: "perfil",
        loadChildren: () =>
          import("../perfil/perfil.module").then((m) => m.PerfilPageModule),
      },
      {
        path: "relatorios",
        loadChildren: () =>
          import("../relatorios/relatorios.module").then(
            (m) => m.RelatoriosPageModule
          ),
      },
    ],
  },
  {
    path: "",
    redirectTo: "dashboard/home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
