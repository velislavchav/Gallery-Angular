import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

function getDate() {
  let today: any = new Date();
  let dd : any = today.getDate();
  let mm: any = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  return today = dd + '/' + mm + '/' + yyyy;
}

@Component({
  selector: 'app-create-blog',
  templateUrl: '../form-template/createForm.component.html',
  styleUrls: ['../form-template/createForm.component.css']
})
export class CreateBlogComponent {
  title = 'Create Blog';
  categories: Array<string> = ['Informative', 'Reportage', 'News', 'Interview', 'Research', 'Personal commentary']
  form: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService, private router: Router, private authService: AuthService) {
    this.form = fb.group({
      title: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
      category: [this.categories[0], [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  onSubmit() {
    const userId = this.authService.getUserId();
    this.form.value['author'] = userId;
    this.form.value['date'] = getDate();
    this.blogService.addBlog(this.form.value);
    this.router.navigate(['/section', 'blog']);
  }

}
