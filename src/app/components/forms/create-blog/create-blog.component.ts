import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: '../form-template/createForm.component.html',
  styleUrls: ['../form-template/createForm.component.css']
})
export class CreateBlogComponent {
  title = 'Create Blog';
  categories: Array<string> = ['Informative', 'Reportage', 'News', 'Interview', 'Research', 'Personal commentary']
  form: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService, private router: Router) {
    this.form = fb.group({
      title: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
      category: [this.categories[0], [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  onSubmit() {
    this.form.value['author'] = 'admin';
    this.form.value['date'] = '8.2.2020';
    this.blogService.addBlog(this.form.value);
    this.router.navigate(['/section',  'blog']);
  }

}
