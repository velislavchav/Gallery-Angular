import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPhoto } from 'src/app/interfaces/IPhoto';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.css']
})
export class SinglePhotoComponent implements OnInit, OnDestroy {
  photo: IPhoto;
  isUserCreator: boolean;
  isUserAlreadyLikedIt: boolean;
  currentUserId: string;
  currentUserData;
  subscriptionForUserData: Subscription;
  constructor(private route: ActivatedRoute, private galleryService: GalleryService, private authService: AuthService) { }

  ngOnInit() {
    this.currentUserId = this.authService.getUserId();
    const id = this.route.snapshot.params['id'];

    this.galleryService.loadPhoto(id).then(ph => {
      this.photo = ph;
      this.photo['id'] = id;
      if(this.photo.authorId === this.authService.getUserId()) {
        this.isUserCreator = true;
      } else {
        this.isUserAlreadyLikedIt = ph.likedBy.includes(this.currentUserId);
        this.isUserCreator = false;
      }
    });

    this.subscriptionForUserData = this.authService.getUser(this.currentUserId).subscribe(userData => {
      this.currentUserData = userData;
    })
  }

  delete(photo) {
    this.galleryService.deletePhoto(photo);
  }

  like(photo) {
    this.galleryService.likePhoto(photo, this.currentUserData)
  }

  dislike(photo) {
    this.galleryService.dislikePhoto(photo, this.currentUserData)
  }

  ngOnDestroy() {
    this.subscriptionForUserData ? this.subscriptionForUserData.unsubscribe() : ""
  }
}
