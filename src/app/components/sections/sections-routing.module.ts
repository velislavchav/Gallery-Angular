import { Routes, RouterModule } from '@angular/router';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { EventsSectionComponent } from './events-section/events-section.component';
import { BlogSectionComponent } from './blogs-section/blog-section.component';
import { SingleBlogComponent } from '../chosen-component/single-blog/single-blog.component';
import { SinglePhotoComponent } from '../chosen-component/single-photo/single-photo.component';

const sectionRoutes: Routes = [
    {
        path: 'section',
        children: [
            {
                path: 'gallery',
                component: GallerySectionComponent,
            },
            {
                path: 'events',
                component: EventsSectionComponent
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
