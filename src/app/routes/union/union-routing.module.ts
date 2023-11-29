import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaravanStoreComponent } from './caravan-store/caravan-store.component';

const routes: Routes = [
  { path: 'caravan-store', component: CaravanStoreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnionRoutingModule { }
