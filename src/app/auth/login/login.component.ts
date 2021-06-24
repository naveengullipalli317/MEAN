import { OnInit, OnDestroy } from '@angular/core';
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';
import { Authservice } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
isLoading = false;
private authStatusSub: Subscription;
constructor (public authservice: Authservice) {}


ngOnInit() {
 this.authStatusSub = this.authservice.getAuthStatusListner().subscribe(
   authStatus => {
    this.isLoading = false;
   }
 );
}

onLogin(form: NgForm) {
  if (form.invalid) {
    return;
  }
  this.isLoading = true;
  this.authservice.login(form.value.email, form.value.password);
}
ngOnDestroy() {
  this.authStatusSub.unsubscribe();
}
}
