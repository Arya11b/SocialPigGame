import { Component, OnInit } from '@angular/core';
import {User} from '../_models';
import {AuthenticationService, UserService} from '../_services';

@Component({
  selector: 'app-online-friends',
  templateUrl: './online-friends.component.html',
  styleUrls: ['./online-friends.component.scss']
})
export class OnlineFriendsComponent implements OnInit {
  users: User[] = [];
  currentUser: User;
  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }
  refreshList(){
    setInterval(this.getFriends.bind(this), 7000);
  }
  ngOnInit() {
    this.refreshList();
  }
  getFriends(){
    this.userService.getFriends().subscribe(data =>{
      let friends = data.filter(d => d.follower == this.currentUser.id);
      this.users = [];
      for(let f of friends){
        this.userService.getById(f.following).subscribe(
          u =>{
            if(Date.now() - Date.parse(u.last_login) < 3600000)
              this.users.push(u);
          }
        )
      }
    });
  }
}
