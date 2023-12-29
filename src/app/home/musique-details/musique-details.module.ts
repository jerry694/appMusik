import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusiqueDetailsPageRoutingModule } from './musique-details-routing.module';

import { MusiqueDetailsPage } from './musique-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusiqueDetailsPageRoutingModule
  ],
  declarations: [MusiqueDetailsPage]
})
export class MusiqueDetailsPageModule {}
