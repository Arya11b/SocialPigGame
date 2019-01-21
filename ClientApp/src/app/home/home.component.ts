import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../_services';
import {User} from '../_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
  }
  get homeText() {
    return 'Dice Mania';
  }

}
