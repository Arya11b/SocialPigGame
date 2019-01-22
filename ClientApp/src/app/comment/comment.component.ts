import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../_services/user.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../_models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  comments: any[] = [];
  users: User[] = [];

  constructor(private route: ActivatedRoute, private userService:  UserService) {
  }
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    console.log(id);
    this.userService.getAll().subscribe(
      x => this.users = x
    );
    this.userService.getUserComments().subscribe(
      data => {
        this.comments = data.filter(d => d.on_user == id);
        console.log(this.comments);
      }
    );
  }
  getUser(id){
    return this.users.find(d => d.id == id);
  }

}
