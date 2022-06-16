import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PratosPage } from './pratos.page';

const routes: Routes = [
  {
    path: '',
    component: PratosPage
  },
  {
    path: 'editar',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PratosPageRoutingModule {}
