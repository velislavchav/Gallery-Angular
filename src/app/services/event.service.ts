import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: Observable<any[]>;
  constructor(public db: AngularFirestore) {
    this.events = db.collection('events').valueChanges();
  }

  loadEvents() {
    return this.events;
  }
}
