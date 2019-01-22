import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {AlertService} from '../_services';

@Component({
  selector: 'app-comment-field',
  templateUrl: './comment-field.component.html',
  styleUrls: ['./comment-field.component.scss']
})
export class CommentFieldComponent implements OnInit {
  // commentForm:
  constructor(private route: ActivatedRoute, private userService: UserService, private alertService: AlertService) { }
  id = 0;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
  }
  addComment(comment_text) {
    let comment = {
      comment_text: comment_text,
      on_user: this.id
    };
    console.log(comment)
      this.userService.postComment(comment).pipe(first())
        .subscribe(
          data => {
            this.alertService.success(' thank you for your feedback, your comment will be published after validation')
          },
          error => {
            this.alertService.error(error);
          });
  }

}
