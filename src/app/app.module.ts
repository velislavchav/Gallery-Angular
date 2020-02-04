// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './core/footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { BlogSectionComponent } from './blog-section/blog-section.component';
import { EventsSectionComponent } from './events-section/events-section.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LandingComponent,
    FooterComponent,
    NotFoundComponent,
    GallerySectionComponent,
    BlogSectionComponent,
    EventsSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
