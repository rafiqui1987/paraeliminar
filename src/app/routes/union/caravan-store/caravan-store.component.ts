import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  startWith,
  switchMap,
  of,
  map,
  distinctUntilChanged,
  from,
} from 'rxjs';
import { StoreService } from '../../../shared/services/store.service';
import { Store } from '../../../shared/interfaces/firebase/store';
import { Lane, TransformLane, Bay } from '@shared/interfaces/firebase/caravanStore';



@Component({
  selector: 'app-caravan-store',
  templateUrl: './caravan-store.component.html',
  styleUrls: ['./caravan-store.component.scss'],
})
export class CaravanStoreComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions?: Observable<Store[]>;
  options: string[] = [];
  caravanStore?: Lane[];
  transformedData: TransformLane[];
  showButton = false;
  showLaneForm = false;


  bay?: string;
  chassis?: string;
  comment?: string;
  lane?: string;

  // displayedColumns: string[] = ['Bay', 'Line A', 'Line B', 'Line C', 'Line D', 'Line E', 'Line F', 'Line G', 'Line H','Line I'];
  displayedColumns: string[] = [
    'bay',
    'laneA',
    'laneB',
    'laneC',
    'laneD',
    'laneE',
    'laneF',
    'laneG',
    'laneH',
    'laneI',
  ];
  bayKeys?: string[];

  constructor(private storeService: StoreService) {
    this.transformedData = [];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => (value ? this._filter(value) : of([])))
    );
  }
  ngOnInit() {
    this.setupFilteredOptions();
    this.getCaravanStore();
  }

  openStoreDialog(){}

  private setupFilteredOptions() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      switchMap(value => this._filter(value))
    );
  }

  private _filter(value: string): Observable<Store[]> {
    if (value.length < 6) {
      return of([]);
    }

    return from(
      this.storeService
        .getChassis()
        .ref.orderBy('chassis')
        .where('stored', '==', false)
        .startAt(value)
        .endAt(value + '\uf8ff')
        .limit(5)
        .get()
    ).pipe(
      map(querySnapshot => {
        const stores: Store[] = [];
        querySnapshot.forEach(doc => {
          stores.push({ id: doc.id, chassis: doc.data().chassis });
        });
        return stores;
      })
    );
  }



  getCaravanStore(): void {
    this.storeService.getCaravanStore().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          ...c.payload.doc.data(),
          id: c.payload.doc.id,
        }))
      )
    ).subscribe(data => {
      this.caravanStore = data;
      this.transformedData = [];

      this.bayKeys = Object.keys(data[0]).filter(key => key !== 'id');

      this.bayKeys.forEach(bayKey => {
        const transformLane: TransformLane = {
          bay: bayKey,
          laneA: '',
          laneB: '',
          laneC: '',
          laneD: '',
          laneE: '',
          laneF: '',
          laneG: '',
          laneH: '',
          laneI: '',
        };

        data.forEach(lane => {
          const laneId = lane.id;
          const bayValue = typeof lane[bayKey as keyof Lane] !== 'string' ? (lane[bayKey as keyof Lane] as Bay).carv : '';

          if (transformLane.hasOwnProperty(laneId)) {
            (transformLane as any)[laneId] = bayValue;
          }
        });

        this.transformedData.push(transformLane);
      });

      this.transformedData.sort((a, b) => {
        const bayA = parseInt(a.bay.replace('bay', ''));
        const bayB = parseInt(b.bay.replace('bay', ''));
        return bayA - bayB;
      });
    });
  }


  getBayNumber(bay: string): string {
    const match = bay.match(/^bay(\d+)$/i);
    return match ? match[1] : bay;
  }





  openWelcomeDialog() {}
}
