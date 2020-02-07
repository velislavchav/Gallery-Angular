import { Component, OnInit } from '@angular/core';
import { IPhoto } from 'src/app/interfaces/IPhoto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery-section',
  templateUrl: './gallery-section.component.html',
  styleUrls: ['./gallery-section.component.css']
})
export class GallerySectionComponent implements OnInit {
  gallery: Array<IPhoto>;
  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.gallery = this.route.snapshot.data['galleryData'];
  }

}
