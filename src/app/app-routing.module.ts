import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TransportListingComponent} from './components/transport-listing/transport-listing.component';


const routes: Routes = [
  {
    path: '',
    component: TransportListingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



// @NgModule({
//   imports: [CommonModule, RouterModule.forRoot(routes)],
//   exports: [RouterModule],
//   declarations: [], // syed added for update
// })