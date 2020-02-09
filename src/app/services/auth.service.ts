import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { IUser } from '../interfaces/IUser';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user: null; 
  // constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {}

  // doRegister(data){
  //   return new Promise<any>((resolve, reject) => {
  //     firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
  //     .then(res => {
  //       resolve(res);
  //     }, err => reject(err))
  //   })
  // }

  // doLogin(data) {
  //   return this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password); 
  // }

  private _isAuth = false;
 
  isAuthChanged = new Subject<boolean>();
  constructor(
    private dbAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    private router: Router,
    // private toastr: ToastrService
  ) {}
 
  get isAuth(){
    return this._isAuth;
  }
 
  initializeAuthState() {
    this.dbAuth.authState.subscribe((userState) => {
      if (userState) {
        this._isAuth = true;
        this.isAuthChanged.next(true);
      } else {
        this._isAuth = false;
        this.isAuthChanged.next(false);
      }
    });
  }
 
  signUp(email: string, password: string) {
    this.dbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        // this.pushUserData({email, name, mobile});
        // this.toastr.success("Successfully registered!", "Success", ToastrConfig);
        this.router.navigate(["/"]);
        console.log(data);
      })
      .catch(err => {
        // this.toastr.error(err, "Error", ToastrConfig);
      });
  }
 
  signIn(email: string, password: string) {
    this.dbAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        this.initializeAuthState(); //
        localStorage.setItem('email', data.user.email);
        // this.toastr.success("Successfully logged in!", "Success", ToastrConfig);
        this.router.navigate(["/"]);
        console.log(data);
      })
      .catch(err => {
        // this.toastr.error(err, "Error", ToastrConfig);
      });
  }
 
  // private pushUserData(user) {
 
  //   user.uid = this.getUserId();
  //   // Sets user data to firestore on login
  //   const userRef: AngularFirestoreDocument<IUser> = this.afDb.doc(
  //     `users/${user.uid}`
  //   );
 
  //   const data = {
  //     uid: user.uid,
  //     email: user.email,
  //     // name: user.name,
  //     // mobile: user.mobile
  //   };
 
  //   return userRef.set(data);
  // }
 
  getUser(id: string): Observable<IUser> {
    const userDocuments = this.afDb.doc<IUser>('users/' + id);
    return userDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          return {...data};
        }))
  }
 
  logout() {
    this.dbAuth.auth.signOut()
    .then(() => {
      localStorage.clear();
      // this.toastr.success("Successfully logged out!", "Success", ToastrConfig);
      this.router.navigate(["/home"]);
    })
    .catch(err => {
      // this.toastr.error(err, "Error", ToastrConfig);
    });
  }
 
  getUserId() {
    return this.dbAuth.auth.currentUser ? this.dbAuth.auth.currentUser.uid : "";
  }
}