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
    this.galleryCollection.add(photo).then(() => {
      this.toastr.success("Successfully created!", "Success");
    }).catch(err => {
      this.toastr.error(err, "Error");
    })
  }

  deletePhoto(photo: IPhoto) {
    this.db.collection("gallery").doc(photo.id).delete().then(() => {
      this.toastr.success('Successfully deleted photo', 'Success');
      this.router.navigate(['/section/gallery']);
    }).catch(err => {
      this.toastr.success("Error removing document!" + err, 'Error')
    });
  }

  likePhoto(photoData, userData) {
    let photoId = photoData.id;
    let userId = userData['uid'];
    //update user data
    let newLikeAdded = userData['likedPhotos'].slice();
    newLikeAdded.push(photoId);
    let newUserData = { ...userData };
    newUserData['likedPhotos'] = newLikeAdded;

    //update photo data
    let newLikes = Number(photoData.likes) + 1;
    let addNewLikedBy = photoData['likedBy'].slice();
    addNewLikedBy.push(userId);
    let newPhotoData = { ...photoData };
    newPhotoData['likedBy'] = addNewLikedBy;
    newPhotoData['likes'] = newLikes;

    this.db.collection("users").doc(userId).set(newUserData).then(() => {
      this.db.collection("gallery").doc(photoId).set(newPhotoData).then(() => {
        this.toastr.success('Successfully liked photo', 'Success');
        this.router.navigate(['/home']);
      })
    }).catch(() => {
      this.toastr.error('Error liking photo', 'Error');
      this.router.navigate(['/home']);
    });
  }

  dislikePhoto(photoData, userData) {
    let photoId = photoData.id;
    let userId = userData['uid'];
    //update user data
    let likes = userData['likedPhotos'].slice();
    let indexOfdislikedPhoto: number = likes.findIndex(phId => phId === photoId);
    likes.splice(indexOfdislikedPhoto, 1);
    let newUserData = { ...userData };
    newUserData['likedPhotos'] = likes;

    //update photo data
    let newLikes = Number(photoData.likes) - 1;
    let removeLikedBy = photoData['likedBy'].slice();
    let indexOfUserId: number = removeLikedBy.findIndex(usrId => usrId === userId);
    removeLikedBy.splice(indexOfUserId, 1);
    let newPhotoData = { ...photoData };
    newPhotoData['likedBy'] = removeLikedBy;
    newPhotoData['likes'] = newLikes;

    this.db.collection("users").doc(userId).set(newUserData).then(() => {
      this.db.collection("gallery").doc(photoId).set(newPhotoData).then(() => {
        this.toastr.success('Successfully disliked photo', 'Success');
        this.router.navigate(['/home']);
      })
    }).catch(() => {
      this.toastr.error('Error disliking photo', 'Error');
      this.router.navigate(['/home']);
    });
  }
}
