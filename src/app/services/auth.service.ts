import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: null; 
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {}

  doRegister(data){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(data) {
    return this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password); 
  }
}