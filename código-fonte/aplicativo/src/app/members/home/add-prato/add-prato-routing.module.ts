import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPratoPage } from './add-prato.page';

const routes: Routes = [
  {
    path: '',
    component: AddPratoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPratoPageRoutingModule {}
