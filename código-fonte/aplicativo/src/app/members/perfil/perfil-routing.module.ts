import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPage } from './perfil.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  },
  {
    path: 'altera-nome',
    loadChildren: () => import('./altera-nome/altera-nome.module').then( m => m.AlteraNomePageModule)
  },
  {
    path: 'altera-endereco',
    loadChildren: () => import('./altera-endereco/altera-endereco.module').then( m => m.AlteraEnderecoPageModule)
  },
  {
    path: 'altera-senha',
    loadChildren: () => import('./altera-senha/altera-senha.module').then( m => m.AlteraSenhaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPageRoutingModule {}
