import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

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
export class CreateBlogComponent implements OnDestroy{
  title = 'Create Blog';
  subscriber: Subscription;
  user: string;
  categories: Array<string> = ['Informative', 'Reportage', 'News', 'Interview', 'Research', 'Personal commentary']
  form: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService, private router: Router, private authService: AuthService) {
    this.form = fb.group({
      title: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
      category: [this.categories[0], [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    })
  }

  onSubmit() {
    const userId = this.authService.getUserId();
    this.subscriber = this.authService.getUser(userId).subscribe(data => {
      this.user = data.name;
      this.form.value['authorId'] = userId;
      this.form.value['author'] = this.user;
      this.form.value['date'] = getDate();
      this.blogService.addBlog(this.form.value);
      this.router.navigate(['/section', 'blog']); 
    })
  }

  ngOnDestroy() {
    this.subscriber ? this.subscriber.unsubscribe() : "";  
  }

  get f() {
    return this.form.controls;
  }
}
