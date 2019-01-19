import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs-compat/operator/switchMap';
import {forEach} from '@angular/router/src/utils/collection';
import {Observable} from 'rxjs/Observable';
import {first} from 'rxjs/operators';
import {AlertService, AuthenticationService} from '../_services';
import {User} from '../_models';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  loading = false;
  isFriend = false;
  friends = [];
  id = 0;
  currentUser: User;
  currentUserSubscription: Subscription;
  constructor(private alertService: AlertService, private route: ActivatedRoute, private userService:  UserService
              , private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  ngOnInit() {
    console.log(this.authenticationService.currentUserValue)
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.user = this.userService.getById(this.id).subscribe(
      data => {
        this.user = data;
        console.log(data);
      }
    );
    this.checkFriend();
  }

  addFriend(){
    this.userService.addFriend({following: this.id}).pipe(first())
      .subscribe(
        data => {
          this.alertService.success('following', true);
          this.checkFriend();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  removeFriend() {
    let id = this.friends.filter(f => f.following == this.id)[0].id
    this.userService.removeFriend(id).pipe(first())
      .subscribe(
        data => {
          this.alertService.success('unfollowed', true);
          this.checkFriend();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
      checkFriend() {
        this.userService.getFriends().subscribe(
          data => {
            this.friends = data.filter(d => d.follower == this.currentUser.id);
            if (data.filter(d => d.following == this.id && d.follower == this.currentUser.id).length > 0)
              this.isFriend = true;
            else
              this.isFriend = false;
            console.log(this.isFriend);
          }
        );
      }

}
