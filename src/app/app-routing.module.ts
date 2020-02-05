import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { EventsSectionComponent } from './components/events-section/events-section.component';
import { BlogSectionComponent } from './components/blogs-section/blog-section.component';
import { GallerySectionComponent } from './components/gallery-section/gallery-section.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingComponent } from './components/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleBlogResolver } from './services/resolvers/single-blog.resolver';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
// import { BlogsSectionResolver } from './services/resolvers/blogs-section.resolver';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: LandingComponent
  },
  {
    path: 'user/register',
    component: RegisterComponent
  },
  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'user/profile',
    component: ProfileComponent
  },
  {
    path: 'section/gallery',
    component: GallerySectionComponent
  },
  {
    path: 'section/events',
    component: EventsSectionComponent
  },
  {
    path: 'section/blog',
    component: BlogSectionComponent,
    // resolve: {
    //   blogsIncoming: BlogsSectionResolver
    // }
  },
  {
    path: 'blog/:id',
    component: SingleBlogComponent,
    resolve: { 
      singleBlog: SingleBlogResolver
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
