import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { UnionRoutingModule } from './union-routing.module';
import { CaravanStoreComponent } from './caravan-store/caravan-store.component';

const COMPONENTS: any[] = [CaravanStoreComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [UnionRoutingModule, SharedModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class UnionModule {}
