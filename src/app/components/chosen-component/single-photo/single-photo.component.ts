import { Component, OnInit } from '@angular/core';
import { IPhoto } from 'src/app/interfaces/IPhoto';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.css']
})
export class SinglePhotoComponent implements OnInit {
  photo: IPhoto;
  isUserCreator: boolean;
  constructor(private route: ActivatedRoute, private galleryService: GalleryService, private authService: AuthService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.galleryService.loadPhoto(id).then(ph => {
      this.photo = ph;
      this.photo['id'] = id;
      if(this.photo.authorId === this.authService.getUserId()) {
        this.isUserCreator = true;
      } else {
        this.isUserCreator = false;
      }
    });
  }

  delete(event, photo) {
    this.galleryService.deletePhoto(photo);
  }

}
