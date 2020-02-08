import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/interfaces/IBlog';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
  blog: IBlog;
  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.blogService.loadSingleBlog(id).then(blog => this.blog = blog);
  }

}
