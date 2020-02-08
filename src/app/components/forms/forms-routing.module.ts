
import { Routes, RouterModule } from '@angular/router';
import { CreatePhotoComponent } from './create-photo/create-photo.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';

const formsRoute: Routes = [
    {
        path: 'create',
        children: [
            {
                path: 'photo',
                component: CreatePhotoComponent
            },
            {
                path: 'blog',
                component: CreateBlogComponent
            },]
    }
];

export const FormsRoutingModule = RouterModule.forChild(formsRoute);