import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  isAuthSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthSub = this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;
    });
    
    if (this.authService.isAuth) {
      this.isAuth = true;
    }
  
}

ngOnDestroy() {
  this.isAuthSub.unsubscribe();
}

tryLogout() {
  this.authService.logout();
}
}
