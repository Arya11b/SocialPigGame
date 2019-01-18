import { UserService } from './../services/user.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm = new FormGroup({});
  // migrate to all users page
  user: {[k: string]: any} = {};

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = {};
  }

  disableSubmit(): boolean {
    return this.userForm.invalid;
  }

  onSubmit() {
    console.log(this.userForm.value.userName);
    this.user.username = this.userForm.value.userName;
    this.user.password = this.userForm.value.password;
    this.user.picture = '';
    this.user.email = this.userForm.value.email;
    this.userService.postUser(this.user);

  }
}
