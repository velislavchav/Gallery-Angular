import { EventService } from '../../../services/event.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IEvent } from '../../../interfaces/IEvent';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-events-section',
  templateUrl: './events-section.component.html',
  styleUrls: ['./events-section.component.css']
})
export class EventsSectionComponent implements OnInit, OnDestroy {
  events: Array<IEvent>;
  currentUserId: string = this.authService.getUserId();
  currentUserData;
  subscription: Subscription;
  subscriptionForUserData: Subscription;

  constructor(private eventService: EventService, private authService: AuthService) {
  }

  ngOnInit() {
    this.subscriptionForUserData = this.authService.getUser(this.currentUserId).subscribe(userData => {
      this.currentUserData = userData;
    })

    this.subscription = this.eventService.loadEvents().subscribe(data => {
      this.events = data;
      this.events.forEach(ev => {
        if (this.currentUserId === ev.authorId) {
          ev['isUserAuthor'] = true;
        } else {
          if (this.currentUserData.enrolledEvents.includes(ev.id)) {
            ev['isUserEnrolledForThisCourse'] = true;
          } else {
            ev['isUserEnrolledForThisCourse'] = false;
          }
          ev['isUserAuthor'] = false;
        }
      })
    })
  }

  delete(event) {
    this.eventService.deleteEvent(event.id)
  }

  enroll(event) {
    const eventId: string = event.id;
    this.eventService.enrollForEvent(eventId, this.currentUserData);
  }

  unenroll(event) {
    const eventId: string = event.id;
    this.eventService.unenrollForEvent(eventId, this.currentUserData);
  }

  ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : ""
    this.subscriptionForUserData ? this.subscriptionForUserData.unsubscribe() : ""
  }
}
