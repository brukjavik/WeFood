import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardPageModule",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "busca",
    loadChildren: () =>
      import("./busca/busca.module").then((m) => m.BuscaPageModule),
  },
  {
    path: "pedidos",
    loadChildren: () =>
      import("./pedidos/pedidos.module").then((m) => m.PedidosPageModule),
  },
  {
    path: "perfil",
    loadChildren: () =>
      import("./perfil/perfil.module").then((m) => m.PerfilPageModule),
  },
  {
    path: "restaurante/:name",
    loadChildren: () =>
      import("./restaurante/restaurante.module").then(
        (m) => m.RestaurantePageModule
      ),
  },
  {
    path: "pedidos/pedido/:numero",
    loadChildren: () =>
      import("./pedidos/pedido/pedido.module").then((m) => m.PedidoPageModule),
  },
  {
    path: "restaurante/pratos",
    loadChildren: () =>
      import("./restaurante/pratos/pratos.module").then(
        (m) => m.PratosPageModule
      ),
  },
  {
    path: "perfil/altera-endereco",
    loadChildren: () =>
      import("./perfil/altera-endereco/altera-endereco.module").then(
        (m) => m.AlteraEnderecoPageModule
      ),
  },
  {
    path: "perfil/altera-nome",
    loadChildren: () =>
      import("./perfil/altera-nome/altera-nome.module").then(
        (m) => m.AlteraNomePageModule
      ),
  },
  {
    path: "perfil/altera-senha",
    loadChildren: () =>
      import("./perfil/altera-senha/altera-senha.module").then(
        (m) => m.AlteraSenhaPageModule
      ),
  },
  {
    path: "carrinho",
    loadChildren: () =>
      import("./carrinho/carrinho.module").then((m) => m.CarrinhoPageModule),
  },
  {
    path: 'relatorios',
    loadChildren: () => import('./relatorios/relatorios.module').then( m => m.RelatoriosPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
