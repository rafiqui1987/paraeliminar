import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Store } from '../interfaces/firebase/store';
import { Lane } from '../interfaces/firebase/caravanStore';


@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private dbPathStore = '/store';
  private dbPathCaravanStore = '/caravanStore';
  // private dbNombres = '/nombres';

  storeRef: AngularFirestoreCollection<Store>;
  laneRef: AngularFirestoreCollection<Lane>;
  // nombreref: AngularFirestoreCollection<Nombre>;

  constructor(private db: AngularFirestore) {
    this.storeRef = db.collection(this.dbPathStore);
    this.laneRef = db.collection(this.dbPathCaravanStore);
    // this.nombreref = db.collection(this.dbNombres);
    // this.db.collection('caravanStore').valueChanges().subscribe(data => {
    //   console.log(data);
    // });
  }

  getChassis(): AngularFirestoreCollection<Store> {
    return this.storeRef;
  }

  getCaravanStore(): AngularFirestoreCollection<Lane> {
    return this.laneRef;
  }
}

// create(tutorial: Store): any {
//   return this.storeRef.add({ ...tutorial });
// }

// update(id: string, data: any): Promise<void> {
//   return this.storeRef.doc(id).update(data);
// }

// delete(id: string): Promise<void> {
//   return this.storeRef.doc(id).delete();
// }
