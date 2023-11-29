import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { map } from 'rxjs/operators';

import { StoreService } from "../../../shared/services/store.service";
import { Store } from "../../../shared/models/store/store";

import { MAT_COLORS } from '@shared';

@Component({
  selector: 'app-design-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
})
export class DesignColorsComponent implements OnInit {
  colors: { key: string; value: any }[] = [];
  store?: Store[];

  valueAscOrder(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
    return a.value.localeCompare(b.value);
  }

  keyAscOrder(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
    return a.key - b.key;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    const colors: { [k: string]: any } = MAT_COLORS;
    for (const key of Object.keys(colors)) {
      this.colors.push({
        key,
        value: colors[key],
      });
    }
    this.retrieveChassis();
  }

  trackByColor(index: number, color: { key: string; value: any }): string {
    return color.key;
  }

  // retrieveTutorials(): void {
  //   this.storeService.getAll().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ id: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(data => {
  //     // console.log("esto es Data",data[0].chassis);

  //     this.store = data;
  //   });
  // }

  // retrieveChassis(): void {
  //   this.storeService.getAll().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
  //     )
  //     ).subscribe(data => {
  //     console.log("esto es Data",data.length);
  //     this.store = data.filter(item => item.chassis && item.chassis.startsWith('LRV'));
  //     console.log("esto es Data",this.store.length);
  //   });
  // }

  retrieveChassis(): void {
    this.storeService.getChassis().ref.orderBy('chassis').startAt('LRV').endAt('LRV\uf8ff')
      .onSnapshot(querySnapshot => {
        let stores:any[] = [];
        querySnapshot.forEach(doc => {
          stores.push({ id: doc.id, ...doc.data() });
        });
        console.log("esto es Data",stores);
        this.store = stores;
      });
  }
}
