import { AuthGuard } from "./guards/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: "./public/login/login.module#LoginPageModule"
  },
  {
    path: "register",
    loadChildren: () =>
      import("./public/login/register/register.module").then(
        m => m.RegisterPageModule
      )
  },
  {
    path: "members",
    canActivate: [AuthGuard],
    loadChildren: "./members/member-routing.module#MemberRoutingModule"
  },
  {
    path: "home",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./members/home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "rest",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./members/restaurante/restaurante.module").then(
        m => m.RestaurantePageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
