import { Component, OnInit, OnDestroy } from '@angular/core';
import { Authservice } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector:'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticted = false;
  private authListenerSubs: Subscription;

constructor(private authservice: Authservice) {}

ngOnInit() {
  this.authListenerSubs = this.authservice
    .getAuthStatusListner()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticted = isAuthenticated;
    });

}
onLogout() {
  this.authservice.logout();
}

ngOnDestroy() {
  this.authListenerSubs.unsubscribe();
}
}
