import { Component, OnInit } from '@angular/core';
import { IPhoto } from 'src/app/interfaces/IPhoto';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.css']
})
export class SinglePhotoComponent implements OnInit {
  photo: IPhoto;
  constructor(private route: ActivatedRoute, private galleryService: GalleryService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.galleryService.loadPhoto(id).then(ph => this.photo = ph);
  }

  delete(event, item) {
    // this.galleryService.deletePhoto(item);
  }

}
