import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser';
import { GalleryService } from 'src/app/services/gallery.service';
import { IPhoto } from 'src/app/interfaces/IPhoto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: IUser;
  currentUserPhotos: Array<IPhoto>;
  isTherePhotosYet: boolean;
  userSubscriber: Subscription;
  photoSubscriber: Subscription;
  constructor(private authService: AuthService, private galleryService: GalleryService) { }

  ngOnInit() {
    const userId = this.authService.getUserId();
    this.userSubscriber = this.authService.getUser(userId).subscribe(data => {
      this.currentUser = data;
    });

    this.photoSubscriber = this.galleryService.loadOwnPhotos(userId).subscribe(data => {
      this.currentUserPhotos = data.filter(x => x !== undefined)
        .sort((x, y) => y.likes - x.likes)
        .slice(0, 3);
      this.isTherePhotosYet = this.currentUserPhotos.length > 0 ? true : false;
    });
  }

  ngOnDestroy() {
    this.userSubscriber ? this.userSubscriber.unsubscribe() : "";
    this.photoSubscriber ? this.photoSubscriber.unsubscribe() : "";
  }

}
