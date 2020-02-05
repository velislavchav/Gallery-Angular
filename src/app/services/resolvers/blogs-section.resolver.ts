import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BlogService } from '../blog.service';
import { IBlog } from 'src/app/interfaces/IBlog';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BlogsResolver implements Resolve<Array<IBlog>> {
  constructor(private blogService: BlogService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
        return this.blogService.loadBlogs()
        .pipe(
            first()
        )
    }
}
