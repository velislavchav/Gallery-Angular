import { environment } from '../environments/environment';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserModule } from './components/user/user.module';
import { SharedFormsModule } from './components/forms/shared-forms.module';
import { SectionModule } from './components/sections/sections.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
 
// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/core/navigation/navigation.component';
import { LandingComponent } from './components/landing/landing.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { NotFoundComponent } from './components/others/not-found/not-found.component';
import { SingleBlogComponent } from './components/chosen-component/single-blog/single-blog.component';
import { SinglePhotoComponent } from './components/chosen-component/single-photo/single-photo.component';
import { LoaderComponent } from './components/others/loader/loader.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { LoginRegisterGuard } from './guards/login-register.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    LandingComponent,
    SingleBlogComponent,
    SinglePhotoComponent,
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
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    SharedFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
  ],
  providers: [AuthGuard, LoginRegisterGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }