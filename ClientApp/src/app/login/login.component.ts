import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({});
  // migrate to all users page
  user: {[k: string]: any} = {};
  returnUrl: string;

  constructor(private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
    if (this.authService.currentUserValue) {
      console.log(this.authService.currentUserValue);
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  disableSubmit(): boolean {
    return this.loginForm.invalid;
  }

  onSubmit() {
    this.user = this.authService.login(this.loginForm.value.userName , this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          // this.loading = false;
        });
  }

}
