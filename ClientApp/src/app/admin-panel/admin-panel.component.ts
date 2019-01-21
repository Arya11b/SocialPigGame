import { Component, OnInit } from '@angular/core';
import {CommentService} from '../_services/comment.service';
import {first} from 'rxjs/operators';
import {AlertService, UserService} from '../_services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  userComment: {[key: string]: any}[] = [];
  modeComment: {[key: string]: any}[] = [];
  gameComment: {[key: string]: any}[] = [];
  constructor(private alertService: AlertService,
              private commentService: CommentService,
              private userService: UserService) { }
  loading = false;

  ngOnInit() {
    this.getGameComments();
    this.getUserComments();
    this.getModeComments();
  }
  private getUserComments() {
    this.commentService.getUserComment().subscribe(
      data => {
        this.userComment = data;
        for ( let comment of this.userComment) {
          this.userService.getById(comment.author).subscribe(user => comment.authorname = user.username);
        }
        console.log(data);
      }
    );

  }
  private getModeComments() {
    this.commentService.getGameModeComment().subscribe(
      data => {
        this.modeComment = data;
        for ( let comment of this.modeComment) {
          this.userService.getById(comment.author).subscribe(user => {
            return comment.authorname = user.username;
          });
        }
        console.log(this.modeComment);
      }
    );

  }
  private getGameComments() {
    this.commentService.getGameComment().subscribe(
      data => {this.gameComment = data;
        for ( let comment of this.gameComment) {
          this.userService.getById(comment.author).subscribe(user => {
            return comment.authorname = user.username;
          });
        }
    });
  }
  validateGame(id: number, value: boolean) {
    console.log('something happened');
    this.commentService.updateGameComment({id: id, validated: value}).pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Validated', true);
          this.getGameComments();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  validateUser(id: number,value: boolean){
    console.log('something happened');
    console.log(id);
    this.commentService.updateUserComment({id: id, validated: value}).pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Validated', true);
          this.getUserComments();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  validateMode(id: number,value: boolean) {

    console.log('something happened');
    this.commentService.updateModeComment({id:id , validated: value}).pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Validated', true);
          this.getModeComments();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
