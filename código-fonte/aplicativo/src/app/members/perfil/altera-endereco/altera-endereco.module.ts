import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlteraEnderecoPageRoutingModule } from './altera-endereco-routing.module';

import { AlteraEnderecoPage } from './altera-endereco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlteraEnderecoPageRoutingModule
  ],
  declarations: [AlteraEnderecoPage]
})
export class AlteraEnderecoPageModule {}
