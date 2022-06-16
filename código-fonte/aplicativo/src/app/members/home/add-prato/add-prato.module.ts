import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPratoPageRoutingModule } from './add-prato-routing.module';

import { AddPratoPage } from './add-prato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPratoPageRoutingModule
  ],
  declarations: [AddPratoPage]
})
export class AddPratoPageModule {}
