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
  constructor(private userService: UserService) {
   }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    }, error => {
      console.log(error);
    });
  }

}
