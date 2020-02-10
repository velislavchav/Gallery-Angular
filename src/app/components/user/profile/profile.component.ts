import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: any;
  subscriber: Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    const user_id = this.authService.getUserId();
    this.subscriber = this.authService.getUser(user_id).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
      
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
