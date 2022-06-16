import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlteraEnderecoPage } from './altera-endereco.page';

const routes: Routes = [
  {
    path: '',
    component: AlteraEnderecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlteraEnderecoPageRoutingModule {}
