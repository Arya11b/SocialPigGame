import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comment-field',
  templateUrl: './comment-field.component.html',
  styleUrls: ['./comment-field.component.scss']
})
export class CommentFieldComponent implements OnInit {
  // commentForm:
  constructor(private route: ActivatedRoute,private userService: UserService) { }
  id = 0;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
  }
  addComment(comment) {
    // this.userService.getUser(this.id).subscribe(
    //   data =>     this.userService.postComment(data.username)
  // );
  }

}
