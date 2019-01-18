import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  comments: any[] = [];
  oUsers: Observable<any[]>;

  constructor(private route: ActivatedRoute, private userService:  UserService) {
  }
  ngOnInit() {
    this.author = {};
    let id = this.route.snapshot.params['id'];
    console.log(id);
    this.userService.getUserComments(id).subscribe(data => {
      this.comments = data.filter(d => d.on_user == id);
      for (let comment of this.comments) {
        this.userService.getUser(comment.author).subscribe(data => comment.author = data.username);
      }
    });
  }

}
