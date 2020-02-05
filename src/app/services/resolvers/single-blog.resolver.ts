import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BlogService } from '../blog.service';

@Injectable({
  providedIn: 'root'
})
export class SingleBlogResolver implements Resolve<any> {
  constructor(private blogService: BlogService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.params['id'];
      return this.blogService.loadSingleBlog(id);
    }
}
