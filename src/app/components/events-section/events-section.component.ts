import { EventService } from '../../services/event.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IEvent } from '../../interfaces/IEvent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-section',
  templateUrl: './events-section.component.html',
  styleUrls: ['./events-section.component.css']
})
export class EventsSectionComponent implements OnInit, OnDestroy {
  events: Array<IEvent>;
  subscription: Subscription;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.subscription = this.eventService.loadEvents().subscribe(data => {
      this.events = data;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
