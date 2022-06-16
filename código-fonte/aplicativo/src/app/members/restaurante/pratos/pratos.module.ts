import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PratosPageRoutingModule } from './pratos-routing.module';

import { PratosPage } from './pratos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PratosPageRoutingModule
  ],
  declarations: [PratosPage]
})
export class PratosPageModule {}
