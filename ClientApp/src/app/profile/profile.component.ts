import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs-compat/operator/switchMap';
import {forEach} from '@angular/router/src/utils/collection';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  oUsers: Observable<any[]>;
  constructor(private route: ActivatedRoute, private userService:  UserService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    console.log(id);
    this.user = this.userService.getUser(id).subscribe(
      data => {
        this.user = data;
        console.log(data);
      }
    );
    // this.oUsers = this.userService.getOUsers();
    // this.userService.getUser(id);
    // this.oUsers.subscribe(data => {
    //     this.user = data[0];
    //     console.log(this.user);
    //   }
    // );
  }

}
