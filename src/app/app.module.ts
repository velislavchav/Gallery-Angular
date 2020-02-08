import { environment } from '../environments/environment';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/core/navigation/navigation.component';
import { LandingComponent } from './components/landing/landing.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserModule } from './components/user/user.module';

// Services
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SharedFormsModule } from './components/forms/shared-forms.module';
import { SectionModule } from './components/sections/sections.module';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent, //
    FooterComponent,
    LandingComponent,
    SingleBlogComponent,
    NotFoundComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    SectionModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    SharedFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
