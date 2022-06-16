import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlteraNomePageRoutingModule } from './altera-nome-routing.module';

import { AlteraNomePage } from './altera-nome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlteraNomePageRoutingModule
  ],
  declarations: [AlteraNomePage]
})
export class AlteraNomePageModule {}
