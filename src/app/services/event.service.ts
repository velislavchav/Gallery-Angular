import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IEvent } from '../interfaces/IEvent';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  constructor(public db: AngularFirestore, private toastr: ToastrService, private router: Router) { }
  loadEvents() {
    return this.db.collection('events').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as IEvent;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    );
  }

  deleteEvent(id: string) {
    this.db.collection("events").doc(id).delete().then(() => {
      this.toastr.success('Successfully deleted event', 'Success');
    }).catch(err => {
      this.toastr.error("Error removing event!" + err, 'Error')
    });
  }

  enrollForEvent(eventId, userData) {
    let newEnrolling = userData.enrolledEvents.slice();
    newEnrolling.push(eventId);
    let newUserData = { ...userData };
    newUserData['enrolledEvents'] = newEnrolling;

    this.db.collection("users").doc(userData.uid).set(newUserData).then(() => {
      this.toastr.success('Successfully enrolled for the event', 'Success');
      this.router.navigate(['/home']);
    })
      .catch(() => {
        this.toastr.error('Error enrolling for the event', 'Error');
        this.router.navigate(['/home']);
      });
  }

  unenrollForEvent(eventId, userData) {
    let userEnrolledEvents: Array<string> = userData.enrolledEvents.slice();
    let indexOfUnenrolledEvent: number = userEnrolledEvents.findIndex(evId => evId === eventId);
    userEnrolledEvents.splice(indexOfUnenrolledEvent, 1);
    let newUserData = { ...userData };
    newUserData['enrolledEvents'] = userEnrolledEvents;

    this.db.collection("users").doc(userData.uid).set(newUserData).then(() => {
      this.toastr.success('Successfully unenrolled for the event', 'Success');
      this.router.navigate(['/home']);
    })
      .catch(() => {
        this.toastr.error('Couldnt unenroll for the event', 'Error');
        this.router.navigate(['/home']);
      });
  }
}
