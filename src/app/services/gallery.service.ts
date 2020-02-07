import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IPhoto } from '../interfaces/IPhoto'


@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(public db: AngularFirestore) { }
  loadGallery() {
    return this.db.collection('gallery').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as IPhoto;
          data.id = a.payload.doc.id;
          return data;
        })
      }),
    )
  }
}
