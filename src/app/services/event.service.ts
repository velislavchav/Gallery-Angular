import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IEvent } from '../interfaces/IEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: Observable<Array<IEvent>>;

  constructor(public db: AngularFirestore) {
    this.events = db.collection('events').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as IEvent;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    );
  }

  loadEvents() {
    return this.events;
  }
}
