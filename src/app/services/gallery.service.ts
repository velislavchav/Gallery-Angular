import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IPhoto } from '../interfaces/IPhoto'


@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  galleryCollection: AngularFirestoreCollection<IPhoto>;

  constructor(public db: AngularFirestore) {
    this.galleryCollection = this.db.collection('gallery');
   }

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

  loadPhoto(id: string) {
    return this.db.collection('gallery').doc(id).ref.get()
    .then(doc => {
      return doc.data() as IPhoto;
    })
  }

  addPhoto(photo: IPhoto) {
    this.galleryCollection.add(photo);
  }

  deletePhoto() {

  }
}
