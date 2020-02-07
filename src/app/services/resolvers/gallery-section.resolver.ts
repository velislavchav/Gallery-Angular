import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { IPhoto } from 'src/app/interfaces/IPhoto';
import { GalleryService } from '../gallery.service';

@Injectable({
    providedIn: 'root'
})
export class GalleryResolver implements Resolve<Array<IPhoto>> {
  constructor(private galleryService: GalleryService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
        return this.galleryService.loadGallery()
        .pipe(
            first()
        )
    }
}
