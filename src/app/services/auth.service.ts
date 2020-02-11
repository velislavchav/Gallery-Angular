import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IUser } from '../interfaces/IUser';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private dbAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  isAuth() {
    return !!localStorage.getItem('email');
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
      .then(async (data) => {
        localStorage.setItem('email', data.user.email);
        this.toastr.success("Successfully logged in!", "Success");
        await this.router.navigate(["/"]);
        await location.reload();
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
      .then(async () => {
        localStorage.clear();
        this.toastr.success("Successfully logged out!", "Success");
        await this.router.navigate(["/home"]);
        await location.reload();
      })
      .catch(err => {
        this.toastr.error(err, "Error");
      });
  }

  getUserId() {
    // let allUsersDocs: Array<string> = [];
    // this.afDb.collection('users').get().toPromise().then(data =>
    //   data.docs.forEach(doc => {
    //     allUsersDocs.push(doc.id)
    //   })
    // ).then(() => {
    //   for (let i = 0; i < allUsersDocs.length; i++) {
    //     const docId = allUsersDocs[i];
    //     this.afDb.doc<IUser>(`users/${docId}`).snapshotChanges().pipe(
    //       first(x => x.payload.data().email === localStorage.getItem('email'))
    //     ).subscribe(x => {
    //       if(!!x.payload.id !== false) {
    //         window.document['curUsrId'] = x.payload.id;
    //       }
    //     })
    //   }
    // })
    if(this.dbAuth.auth.currentUser) {
      return this.dbAuth.auth.currentUser.uid;
    } else {
      this.router.navigate(['/home']);
      return null;
    }
  }
}