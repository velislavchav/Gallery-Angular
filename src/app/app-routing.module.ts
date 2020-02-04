import { ProfileComponent } from './user/profile/profile.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { EventsSectionComponent } from './events-section/events-section.component';
import { BlogSectionComponent } from './blog-section/blog-section.component';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
    component: BlogSectionComponent
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
