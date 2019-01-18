import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  users: any[];
  oUsers: Observable<any[]>;

  constructor(private userService: UserService) {
   }

  ngOnInit() {
    this.oUsers = this.userService.getOUsers();
    this.userService.getUsers();
    this.oUsers.subscribe(data =>{
      this.users = data;
      console.log(this.users);
    }
      );

  }

}
