import { Routes, RouterModule } from '@angular/router';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { EventsSectionComponent } from './events-section/events-section.component';
import { BlogSectionComponent } from './blogs-section/blog-section.component';
import { SingleBlogComponent } from '../chosen-component/single-blog/single-blog.component';
import { SinglePhotoComponent } from '../chosen-component/single-photo/single-photo.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CreateSectionComponent } from './create-section/create-section.component';

const sectionRoutes: Routes = [
    {
        path: 'section',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'gallery',
                component: GallerySectionComponent,
            },
            {
                path: 'create',
                component: CreateSectionComponent,
            },
            {
                path: 'events',
                component: EventsSectionComponent,
            },
            {
                path: 'blog',
                component: BlogSectionComponent,
            },
            {
                path: 'blog/:id',
                component: SingleBlogComponent,
            },
            {
                path: 'gallery/:id',
                component: SinglePhotoComponent,
            }
        ]
    }
];

export const SectionsRoutingModule = RouterModule.forChild(sectionRoutes);
