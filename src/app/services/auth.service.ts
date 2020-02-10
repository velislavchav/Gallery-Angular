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
  // private _isAuth = !!localStorage.getItem('email');
  isAuthChanged = new Subject<boolean>();

  constructor(
    private dbAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  isAuth() {
    // return this._isAuth;
    return localStorage.getItem('email') !== null;
  }

  initializeAuthState() {
    // if(localStorage.getItem('email')) {
    //   this._isAuth = true;
    //   this.isAuthChanged.next(true);
    // } else {
    //   this._isAuth = false;
    //   this.isAuthChanged.next(false);
    // }
    this.dbAuth.authState.subscribe((userState) => {
      if (userState) {
        // this._isAuth = true;
        this.isAuthChanged.next(true);
      } else {
        // this._isAuth = false;
        this.isAuthChanged.next(false);
      }
    });
  }

  signUp(email: string, password: string, phone: string, name: string) {
    this.dbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
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
      .then(data => {
        localStorage.setItem('email', data.user.email);
        this.toastr.success("Successfully logged in!", "Success");
        this.router.navigate(["/"]);
        this.initializeAuthState();
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
      phone: user.phone
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
        this.toastr.success("Successfully logged out!", "Success");
        this.router.navigate(["/home"]);
        location.reload();
      })
      .catch(err => {
        this.toastr.error(err, "Error");
      });
  }

  getUserId() {
    return this.dbAuth.auth.currentUser ? this.dbAuth.auth.currentUser.uid : "";
  }

  getAuthorName(id: string) {
    // let docRef = this.afDb.collection("users").doc(id);
    // docRef.subscribe(function (doc) {
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }).catch(function (error) {
    //   console.log("Error getting document:", error);
    // });

  //   return this.userRef.valueChanges().subscribe(item => {
  //     console.log(item);
  //     return item;
  // });

  }
}