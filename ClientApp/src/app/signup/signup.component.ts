import { UserService } from './../_services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../_models';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertService, AuthenticationService} from '../_services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm = new FormGroup({});
  loading = false;
  submitted = false;
  // migrate to all users page
  user: User;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private alertService: AlertService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.user = new User;
  }

  disableSubmit(): boolean {
    return this.userForm.invalid;
  }

  onSubmit() {
    console.log(this.userForm.value.userName);
    this.user.username = this.userForm.value.userName;
    this.user.password = this.userForm.value.password;
    this.user.first_name = this.userForm.value.first_name;
    this.user.last_name = this.userForm.value.last_name;
    // this.user.picture = '';
    this.user.email = this.userForm.value.email;
    this.userService.register(this.user).pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }
}
