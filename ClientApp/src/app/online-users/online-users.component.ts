import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from '../_services';
import {first} from 'rxjs/operators';
import {User} from '../_models';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss']
})
export class OnlineUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }
  ngOnInit() {
    this.loadAllUsers();
    this.refreshList();
  }
  private refreshList() {
    setInterval(this.loadAllUsers.bind(this), 5000);
  }
  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users.filter(u => Date.now() - Date.parse(u.last_login) < 3600000);
    });
  }

}
