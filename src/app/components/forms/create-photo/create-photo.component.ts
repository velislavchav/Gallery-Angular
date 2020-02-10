import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GalleryService } from 'src/app/services/gallery.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-photo',
  templateUrl: '../form-template/createForm.component.html',
  styleUrls: ['../form-template/createForm.component.css']
})
export class CreatePhotoComponent {
  title = 'Create Photo';
  categories: Array<string> = ['Landscape', 'Portrait', 'Architectural', 'Fine Art', 'Fashion', 'Abstract', 'Sports']


  form: FormGroup;
  constructor(private fb: FormBuilder, private galleryService: GalleryService, private router: Router, private authService: AuthService) {
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
    this.form.value['likedBy'] = [];
    this.form.value['likes'] = 0;
    this.galleryService.addPhoto(this.form.value);
    this.router.navigate(['/section',  'gallery']);
  }

}
