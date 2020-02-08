import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPhoto } from 'src/app/interfaces/IPhoto';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-gallery-section',
  templateUrl: './gallery-section.component.html',
  styleUrls: ['./gallery-section.component.css']
})
export class GallerySectionComponent implements OnInit, OnDestroy {
  gallery: Array<IPhoto>;
  private subscription: Subscription;
  constructor(public route: ActivatedRoute, private galleryService: GalleryService) {}

  ngOnInit() {
    this.subscription = this.galleryService.loadGallery().subscribe(data => this.gallery = data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
