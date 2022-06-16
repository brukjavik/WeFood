import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlteraSenhaPage } from './altera-senha.page';

const routes: Routes = [
  {
    path: '',
    component: AlteraSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlteraSenhaPageRoutingModule {}
