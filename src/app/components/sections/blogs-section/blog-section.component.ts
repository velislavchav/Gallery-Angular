import { BlogService } from '../../../services/blog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBlog } from '../../../interfaces/IBlog';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})
export class BlogSectionComponent implements OnInit, OnDestroy {
  blogs: Array<IBlog>;
  private subscription: Subscription;

  constructor(public route: ActivatedRoute, private blogService: BlogService, private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.blogService.loadBlogs().subscribe(data => {
      this.blogs = data;
      data.forEach(blog => {
        this.authService.getAuthorName(blog.author)
      })
      
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
