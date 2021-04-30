import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Authservice } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
isLoading = false;

constructor(public authService: Authservice) {}

  onSignup(form: NgForm) {
  if (form.invalid) {
    return;
 }
 this.authService.createUser(form.value.email, form.value.password);
}
}
