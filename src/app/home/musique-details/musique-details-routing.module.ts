import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusiqueDetailsPage } from './musique-details.page';

const routes: Routes = [
  {
    path: '',
    component: MusiqueDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusiqueDetailsPageRoutingModule {}
