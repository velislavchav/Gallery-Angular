import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IUser } from '../interfaces/IUser';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthChanged = new Subject<boolean>(); //

  constructor(
    private dbAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  get isAuth() {
    return !!localStorage.getItem('email');
  }

  initializeAuthState() {
    this.dbAuth.authState.subscribe(() => {
      if(!!localStorage.getItem('email')) {
        this.isAuthChanged.next(true);
      } else {
        this.isAuthChanged.next(false);
      }
    });
  }

  signUp(email: string, password: string, phone: string, name: string) {
    this.dbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.pushUserData({ email, name, phone });
        this.toastr.success("Successfully registered!", "Success");
        this.router.navigate(["/user/login"]);
      })
      .catch(err => {
        this.toastr.error(err, "Error");
      });
  }

  signIn(email: string, password: string) {
    this.dbAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        this.router.navigate(["/"]);
        localStorage.setItem('email', data.user.email);
        this.toastr.success("Successfully logged in!", "Success");
        this.initializeAuthState()
        // location.reload();
      })
      .catch(err => {
        this.toastr.error(err, "Error");
      });
  }

  private pushUserData(user) {
    user.uid = this.getUserId();
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<IUser> = this.afDb.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      phone: user.phone,
      likedPhotos: [],
      enrolledEvents: [],
    };
    return userRef.set(data);
  }

  getUser(id: string): Observable<IUser> {
    const userDocuments = this.afDb.doc<IUser>('users/' + id);
    return userDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          return { ...data };
        }))
  }

  logout() {
    this.dbAuth.auth.signOut()
      .then(() => {
        localStorage.clear();
        this.router.navigate(["/home"]);
        this.toastr.success("Successfully logged out!", "Success");
        location.reload();
      })
      .catch(err => {
        this.toastr.error(err, "Error");
      });
  }

  getUserId() {
    if(this.dbAuth.auth.currentUser) {
      return this.dbAuth.auth.currentUser.uid;
    } else {
      this.router.navigate(['/home']);
      return null;
    }
  }
}