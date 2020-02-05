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
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.blog = this.route.snapshot.data['singleBlog'];
  }

}