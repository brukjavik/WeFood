import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlteraSenhaPageRoutingModule } from './altera-senha-routing.module';

import { AlteraSenhaPage } from './altera-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlteraSenhaPageRoutingModule
  ],
  declarations: [AlteraSenhaPage]
})
export class AlteraSenhaPageModule {}
