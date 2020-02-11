import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IPhoto } from '../interfaces/IPhoto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  galleryCollection: AngularFirestoreCollection<IPhoto>;
  photoDoc: AngularFirestoreDocument<IPhoto>;

  constructor(public db: AngularFirestore, private toastr: ToastrService, private router: Router) {
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
    try {
      this.galleryCollection.add(photo);
      this.toastr.success("Successfully created!", "Success");
    } catch (error) {
      this.toastr.error(error, "Error");
    }

  }

  deletePhoto(photo: IPhoto) {
    this.db.collection("gallery").doc(photo.id).delete().then(() => {
      this.toastr.success('Successfully deleted photo', 'Success');
      this.router.navigate(['/section/gallery']);
    }).catch(err => {
      this.toastr.success("Error removing document!" + err, 'Error')
    });
  }
}
