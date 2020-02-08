import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { CreatePhotoComponent } from './create-photo/create-photo.component';
import { FormsRoutingModule } from './forms-routing.module';


@NgModule({
  declarations: [CreateBlogComponent, CreatePhotoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsRoutingModule
  ]
})
export class SharedFormsModule { }
