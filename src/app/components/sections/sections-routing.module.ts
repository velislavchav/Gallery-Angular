import { Routes, RouterModule } from '@angular/router';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { EventsSectionComponent } from './events-section/events-section.component';
import { BlogSectionComponent } from './blogs-section/blog-section.component';
import { SingleBlogComponent } from '../single-blog/single-blog.component';

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
            }
        ]
    }
];

export const SectionsRoutingModule = RouterModule.forChild(sectionRoutes);
