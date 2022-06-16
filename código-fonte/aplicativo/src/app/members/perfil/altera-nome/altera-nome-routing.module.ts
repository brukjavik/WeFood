import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlteraNomePage } from './altera-nome.page';

const routes: Routes = [
  {
    path: '',
    component: AlteraNomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlteraNomePageRoutingModule {}
