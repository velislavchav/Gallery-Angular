import { BlogService } from '../../../services/blog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBlog } from '../../../interfaces/IBlog';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})
export class BlogSectionComponent implements OnInit, OnDestroy {
  blogs: Array<IBlog>;
  private subscription: Subscription;

  constructor(public route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit() {
    this.subscription = this.blogService.loadBlogs().subscribe(data => {
      this.blogs = data
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
